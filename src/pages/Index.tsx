import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VideoSection from "@/components/VideoSection";
import WhySection from "@/components/WhySection";
import ProductSection from "@/components/ProductSection";
import DreamTeamSection from "@/components/DreamTeamSection";
import PromotionsSection from "@/components/PromotionsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TeamSection from "@/components/TeamSection";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <VideoSection />
        <WhySection />
        <ProductSection />
        <DreamTeamSection />
        <PromotionsSection />
        <TestimonialsSection />
        <TeamSection />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
};

export default Index;
