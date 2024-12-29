import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to EasyBid
        </h1>
        <p className="text-xl mb-8">
          Discover unique items and bid on exciting auctions!
        </p>
        <div className="space-x-4">
          <Button asChild size="lg">
            <Link href="/auctions">Browse Auctions</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
