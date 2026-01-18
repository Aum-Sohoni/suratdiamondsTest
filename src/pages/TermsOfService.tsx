import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const TermsOfService = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-8">
            {t("termsOfService")}
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground font-body space-y-8">
            <p className="text-sm text-muted-foreground">
              {t("lastUpdated")}: January 11, 2026
            </p>

            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{t("termsIntroTitle")}</h2>
              <p>{t("termsIntroText")}</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{t("productsServicesTitle")}</h2>
              <p>{t("productsServicesText")}</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{t("pricingPaymentTitle")}</h2>
              <p>{t("pricingPaymentText")}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("pricingPaymentItem1")}</li>
                <li>{t("pricingPaymentItem2")}</li>
                <li>{t("pricingPaymentItem3")}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{t("shippingDeliveryTitle")}</h2>
              <p>{t("shippingDeliveryText")}</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{t("returnsRefundsTitle")}</h2>
              <p>{t("returnsRefundsText")}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("returnsRefundsItem1")}</li>
                <li>{t("returnsRefundsItem2")}</li>
                <li>{t("returnsRefundsItem3")}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{t("warrantyTitle")}</h2>
              <p>{t("warrantyText")}</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{t("intellectualPropertyTitle")}</h2>
              <p>{t("intellectualPropertyText")}</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{t("limitationLiabilityTitle")}</h2>
              <p>{t("limitationLiabilityText")}</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{t("governingLawTitle")}</h2>
              <p>{t("governingLawText")}</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{t("contactUsTitle")}</h2>
              <p>{t("termsContactText")}</p>
              <p className="text-foreground">
                {t("companyName")}<br />
                {t("regNo")}<br />
                {t("legalAddress")}<br />
                {t("email")}: info@suratdiamond.lv
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
