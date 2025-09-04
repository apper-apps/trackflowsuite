import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    critical: "bg-gradient-to-r from-error to-red-600 text-white shadow-sm",
    high: "bg-gradient-to-r from-warning to-orange-600 text-white shadow-sm",
    medium: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 shadow-sm",
    low: "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-sm",
    status: "bg-gradient-to-r from-info to-blue-600 text-white shadow-sm"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-200",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export default Badge;