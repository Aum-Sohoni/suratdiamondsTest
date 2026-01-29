import React, { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsContextType {
    trackEvent: (eventType: string, metadata?: any) => Promise<void>;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const [visitorLocation, setVisitorLocation] = React.useState<any>(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                setVisitorLocation({
                    country: data.country_name,
                    city: data.city,
                    region: data.region,
                    ip: data.ip
                });
            } catch (error) {
                console.error("Failed to fetch location:", error);
            }
        };

        fetchLocation();
    }, []);

    const trackEvent = async (eventType: string, metadata?: any) => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            await (supabase.from("analytics_events" as any) as any).insert({
                event_type: eventType,
                page_path: window.location.pathname,
                metadata: {
                    ...(metadata || {}),
                    location: visitorLocation,
                },
                user_id: session?.user?.id || null,
                session_id: sessionStorage.getItem("analytics_session_id") || undefined,
            });
        } catch (error) {
            console.error("Failed to track event:", error);
        }
    };

    useEffect(() => {
        // Generate session ID if not exists
        if (!sessionStorage.getItem("analytics_session_id")) {
            sessionStorage.setItem("analytics_session_id", Math.random().toString(36).substring(2, 15));
        }

        // Track page view on route change
        trackEvent("page_view", { title: document.title });
    }, [location.pathname]);

    return (
        <AnalyticsContext.Provider value={{ trackEvent }}>
            {children}
        </AnalyticsContext.Provider>
    );
};

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (context === undefined) {
        throw new Error("useAnalytics must be used within an AnalyticsProvider");
    }
    return context;
};
