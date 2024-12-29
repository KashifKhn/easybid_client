import { FAQSection } from "@/components/home/FAQSection";
import { HeroSection } from "@/components/home/HeroSection";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";

export default function Home() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            What Our Users Say
          </h2>
          <TestimonialCarousel />
        </div>
      </div>
      <FAQSection />
    </div>
  );
}
