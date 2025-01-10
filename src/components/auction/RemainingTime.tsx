"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface RemainingTimeProps {
  startTime?: string;
  endTime?: string;
}

export const RemainingTime: React.FC<RemainingTimeProps> = ({
  startTime,
  endTime,
}) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const start = startTime ? new Date(startTime).getTime() : undefined;
      const end = endTime ? new Date(endTime).getTime() : undefined;

      if (start && now < start) {
        const difference = start - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeLeft(`Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      } else if (end && now < end) {
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

          setTimeLeft(`End in: ${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      } else if (end && now >= end) {
        setTimeLeft("Auction ended");
        clearInterval(timer);
      } else {
        setTimeLeft("No auction details available");
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, endTime]);

  return (
    <Badge
      variant={
        timeLeft === "Auction ended"
          ? "destructive"
          : timeLeft.startsWith("Starts in")
            ? "default"
            : "secondary"
      }
      className="text-sm font-semibold"
    >
      <span className="sr-only">Remaining Time</span>
      {timeLeft}
    </Badge>
  );
};
