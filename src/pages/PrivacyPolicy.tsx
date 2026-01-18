import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-8">
            {t("privacyPolicy")}
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground font-body space-y-8">
            <p className="text-sm text-muted-foreground">
              {t("lastUpdated")}: January 11, 2026
            </p>

            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{t("privacyIntroTitle")}</h2>
              <p>{t("privacyIntroText")}</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{t("infoCollectTitle")}</h2>
              <p>{t("infoCollectText")}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("infoCollectItem1")}</li>
                <li>{t("infoCollectItem2")}</li>
                <li>{t("infoCollectItem3")}</li>
                <li>{t("infoCollectItem4")}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{t("infoUseTitle")}</h2>
              <p>{t("infoUseText")}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("infoUseItem1")}</li>
                <li>{t("infoUseItem2")}</li>
                <li>{t("infoUseItem3")}</li>
                <li>{t("infoUseItem4")}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{t("dataSharingTitle")}</h2>
              <p>{t("dataSharingText")}</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{t("dataSecurityTitle")}</h2>
              <p>{t("dataSecurityText")}</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{t("cookiesTitle")}</h2>
              <p>{t("cookiesText")}</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{t("yourRightsTitle")}</h2>
              <p>{t("yourRightsText")}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("yourRightsItem1")}</li>
                <li>{t("yourRightsItem2")}</li>
                <li>{t("yourRightsItem3")}</li>
                <li>{t("yourRightsItem4")}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{t("contactUsTitle")}</h2>
              <p>{t("contactUsText")}</p>
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

export default PrivacyPolicy;
