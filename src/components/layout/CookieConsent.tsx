import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export const CookieConsent = () => {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            // Small delay to show animation
            setTimeout(() => setIsVisible(true), 1000);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "true");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookieConsent", "false");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border shadow-lg md:p-6"
                >
                    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl">
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-sm font-semibold font-display mb-1 text-foreground">
                                {t("cookieBannerTitle")}
                            </h3>
                            <p className="text-xs text-muted-foreground font-body max-w-2xl">
                                {t("cookieConsentText")}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDecline}
                                className="text-xs"
                            >
                                {t("decline")}
                            </Button>
                            <Button
                                variant="luxury"
                                size="sm"
                                onClick={handleAccept}
                                className="text-xs"
                            >
                                {t("accept")}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
