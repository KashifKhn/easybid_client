import { PageHero } from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Shield, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About EasyBid"
        subtitle="Discover our story and mission in revolutionizing online auctions"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About EasyBid</h1>
          <p className="text-lg text-muted-foreground mb-8">
            EasyBid is a premier online auction platform connecting buyers and
            sellers worldwide. We provide a secure, transparent, and
            user-friendly environment for conducting auctions of all types.
          </p>

          <div className="grid gap-8 md:grid-cols-3 mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Join our growing community of buyers and sellers from around
                    the world.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Shield className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Security</h3>
                  <p className="text-sm text-muted-foreground">
                    We prioritize the security of your transactions and personal
                    information.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Award className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    We ensure high-quality listings and verified sellers on our
                    platform.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground">
              Our mission is to create the most accessible and reliable online
              auction platform, where anyone can buy and sell with confidence.
              We strive to provide innovative tools and features that make the
              auction process simple and enjoyable for everyone.
            </p>

            <h2 className="text-2xl font-bold">Our Story</h2>
            <p className="text-muted-foreground">
              Founded in 2023, EasyBid emerged from a vision to modernize the
              traditional auction experience. What started as a small platform
              has grown into a trusted marketplace serving thousands of users
              globally. Our commitment to transparency, security, and user
              satisfaction remains at the core of everything we do.
            </p>

            <h2 className="text-2xl font-bold">Why Choose EasyBid?</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Secure and transparent bidding process</li>
              <li>User-friendly interface for both buyers and sellers</li>
              <li>Dedicated customer support team</li>
              <li>Competitive fees and pricing</li>
              <li>Advanced fraud protection</li>
              <li>Real-time bidding updates</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
