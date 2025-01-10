"use client";
import { AuctionSection } from "@/components/home/AuctionSection";
import { FAQSection } from "@/components/home/FAQSection";
import { HeroSection } from "@/components/home/HeroSection";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { useAuctions } from "@/hooks/useAuctions";

export default function Home() {
  const { getAuctions } = useAuctions();
  const { data } = getAuctions({});
  const activeAuctions = data?.filter((auct) => auct.status === "ACTIVE");
  const compAuctions = data?.filter((auct) => auct.status === "COMPLETED");
  const pendAuctions = data?.filter((auct) => auct.status === "PENDING");

  return (
    <div className="space-y-16">
      <HeroSection />
      {activeAuctions && activeAuctions?.length > 0 && (
        <AuctionSection title="Current Auctions" auctions={activeAuctions} />
      )}

      {pendAuctions && pendAuctions?.length > 0 && (
        <AuctionSection title="Upcoming Auctions" auctions={pendAuctions} />
      )}

      {compAuctions && compAuctions?.length > 0 && (
        <AuctionSection
          title="Completed Auctions"
          auctions={compAuctions || []}
        />
      )}
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
