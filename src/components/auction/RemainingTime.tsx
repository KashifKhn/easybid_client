"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface RemainingTimeProps {
  endTime: string;
}

export const RemainingTime: React.FC<RemainingTimeProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const difference = end - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft("Auction ended");
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <Badge
      variant={timeLeft === "Auction ended" ? "destructive" : "secondary"}
      className="text-sm font-semibold"
    >
      <span className="sr-only">Remaining Time</span>
      {timeLeft}
    </Badge>
  );
};
