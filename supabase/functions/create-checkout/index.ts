import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://bdurxefnxwlagftimxdp.lovableproject.com',
  'http://localhost:5173',
  'http://localhost:8080',
  'https://aum-sohoni.github.io',
];

const getCorsHeaders = (origin: string | null) => {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) 
    ? origin 
    : ALLOWED_ORIGINS[0];
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Credentials': 'true',
  };
};

interface CheckoutRequest {
  items: {
    productId: string;
    quantity: number;
  }[];
  language?: string;
}

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Create Supabase client with service role for database access
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  // Create Supabase client with anon key for user authentication
  const supabaseAuth = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
    
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const { items, language = "en" } = await req.json() as CheckoutRequest;
    logStep("Received checkout request", { itemCount: items?.length, language });

    if (!items || items.length === 0) {
      throw new Error("No items provided for checkout");
    }

    // Validate all items have required fields
    for (const item of items) {
      if (!item.productId || typeof item.productId !== 'string') {
        throw new Error("Invalid product ID provided");
      }
      if (!item.quantity || typeof item.quantity !== 'number' || item.quantity < 1 || !Number.isInteger(item.quantity)) {
        throw new Error("Invalid quantity provided");
      }
    }

    // Fetch product details from database to get authoritative prices
    const productIds = items.map(item => item.productId);
    const { data: dbProducts, error: productsError } = await supabaseClient
      .from('products')
      .select('id, name, name_lv, name_ru, price, is_active')
      .in('id', productIds);

    if (productsError) {
      logStep("Database error fetching products", { error: productsError.message });
      throw new Error("Failed to fetch product details");
    }

    if (!dbProducts || dbProducts.length === 0) {
      throw new Error("No valid products found");
    }

    // Verify all requested products exist and are active
    for (const item of items) {
      const dbProduct = dbProducts.find(p => p.id === item.productId);
      if (!dbProduct) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      if (!dbProduct.is_active) {
        throw new Error(`Product is no longer available: ${dbProduct.name}`);
      }
    }

    logStep("Products validated from database", { count: dbProducts.length });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Check if customer already exists
    let customerId: string | undefined;
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    }

    // Create line items for Stripe checkout using DATABASE prices (not client-supplied)
    const lineItems = items.map((item) => {
      const dbProduct = dbProducts.find(p => p.id === item.productId);
      if (!dbProduct) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      // Use localized name based on language
      let productName = dbProduct.name;
      if (language === "lv" && dbProduct.name_lv) {
        productName = dbProduct.name_lv;
      } else if (language === "ru" && dbProduct.name_ru) {
        productName = dbProduct.name_ru;
      }

      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: productName,
          },
          // Use price from DATABASE, not from client
          unit_amount: Math.round(dbProduct.price * 100),
        },
        quantity: item.quantity,
      };
    });

    logStep("Created line items from database prices", { count: lineItems.length });

    const origin = req.headers.get("origin") || "http://localhost:5173";

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=true`,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["LV", "EE", "LT", "DE", "PL", "SE", "FI", "DK", "NO"],
      },
      metadata: {
        language,
        user_id: user.id,
      },
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
