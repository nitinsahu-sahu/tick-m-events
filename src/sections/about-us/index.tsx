import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Footer from "src/components/Footer";
import Header from "src/components/Header";
import { PromotionLogoBar } from "src/components/brands-logo";
import { getPromotionLogo } from "src/redux/actions/customization/promotion-logo";
import { AppDispatch, RootState } from "src/redux/store";

import { HeroSection } from "./HeroSection";
import { OurAgent } from "./OurAgent";
import { MissionSection } from "./MissionSection";
import { TestimonialsSlider } from "./TestimonialsSlider";
import FAQSection from "./FAQSection";


export function AboutUs() {
    const dispatch = useDispatch<AppDispatch>();
    const { promotionLogos, loading } = useSelector((state: RootState) => state.customization);
    useEffect(() => {
        dispatch(getPromotionLogo())
    }, [dispatch]);
    return (
        <>
            <Header />
            <HeroSection />
            <OurAgent />
            <MissionSection />
            <TestimonialsSlider />
            {/* BRANDS SECTION */}
            <PromotionLogoBar
                brands={promotionLogos}
                mainHead="Premium Brands"
                subHead="Unveil the Finest Selection of High-End Vehicles"
            />
            <FAQSection />
            <Footer />
        </>
    );
}