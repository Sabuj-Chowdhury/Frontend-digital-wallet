import FAQSection from "@/components/modules/Home/FAQSection";
import Hero from "@/components/modules/Home/Hero";
import StepByStepGuide from "@/components/modules/Home/StepByStepGuide";

const HomePage = () => {
  return (
    <div className="py-16 px-4 container mx-auto">
      <Hero />
      <StepByStepGuide />
      <FAQSection />
    </div>
  );
};

export default HomePage;
