import Link from "next/link";
import { Button } from "@/components/ui/button";
import { theme } from "@/styles/theme";

const HeroSection = () => {
  return (
    <div style={{ backgroundColor: theme.colors.primary, color: "white" }}>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to EasyBid
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl">
          Discover unique items and bid on exciting auctions. Start your journey
          with EasyBid today!
        </p>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
          <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
            <Link href="/auctions">
              <Button variant="secondary" size="lg">
                Explore Auctions
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="default" size="lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
