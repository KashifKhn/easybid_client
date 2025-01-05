import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin rounded-full", {
  variants: {
    size: {
      xsm: "h-5 w-5 border-2",
      sm: "h-8 w-8 border-2",
      md: "h-16 w-16 border-4",
      lg: "h-32 w-32 border-8",
    },
    color: {
      primary: "border-primary border-b-transparent",
      white: "border-white border-b-transparent",
      secondary: "border-secondary border-b-transparent",
      destructive: "border-destructive border-b-transparent",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

export interface LoadingSpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof spinnerVariants> {}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  size,
  color = "primary",
  ...props
}) => {
  return (
    <div
      className={cn("flex justify-center items-center", className)}
      {...props}
    >
      <div className={cn(spinnerVariants({ size, color }))}></div>
    </div>
  );
};

export { LoadingSpinner, spinnerVariants };
