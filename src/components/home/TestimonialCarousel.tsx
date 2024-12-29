"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Frequent Buyer",
    rating: 5,
    content:
      "EasyBid has revolutionized my auction experience. The platform is intuitive and the deals are unbeatable!",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Antique Seller",
    rating: 4,
    content:
      "As a seller, I've found EasyBid to be the perfect platform to reach enthusiastic buyers. The process is smooth and efficient.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Collector",
    rating: 5,
    content:
      "I've discovered so many unique items on EasyBid. It's become my go-to place for expanding my collection.",
  },
  {
    id: 4,
    name: "Emily Brown",
    role: "First-time User",
    rating: 4,
    content:
      "I was hesitant at first, but EasyBid made my first online auction experience incredibly easy and enjoyable.",
  },
  {
    id: 5,
    name: "David Lee",
    role: "Art Dealer",
    rating: 5,
    content:
      "The variety and quality of art pieces available on EasyBid are impressive. It's a game-changer for art dealers like me.",
  },
  {
    id: 6,
    name: "Sarah Wilson",
    role: "Vintage Enthusiast",
    rating: 5,
    content:
      "EasyBid is a treasure trove for vintage lovers. I've found pieces here that I couldn't find anywhere else!",
  },
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 py-8">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0">
              <blockquote className="text-center">
                <p className="text-lg font-medium mb-4">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <cite className="text-sm not-italic">
                  <span className="font-semibold">{testimonial.name}</span>
                  <span className="block text-muted-foreground">
                    {testimonial.role}
                  </span>
                </cite>
                <div className="flex justify-center mt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="default"
            size="sm"
            className={`w-3 h-3 bg-red-50 rounded-full mx-1 p-0 ${
              index === currentIndex
                ? "bg-primary"
                : "bg-muted hover:bg-primary/50"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
