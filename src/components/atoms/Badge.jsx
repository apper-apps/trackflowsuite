import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
default: "bg-gray-100 text-gray-800",
    critical: "bg-gradient-to-r from-error to-red-600 text-white shadow-sm",
    high: "bg-gradient-to-r from-warning to-orange-600 text-white shadow-sm",
    medium: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 shadow-sm",
    low: "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-sm",
    status: "bg-gradient-to-r from-info to-blue-600 text-white shadow-sm",
    "label-red": "bg-red-100 text-red-800 border border-red-200",
    "label-blue": "bg-blue-100 text-blue-800 border border-blue-200",
    "label-green": "bg-green-100 text-green-800 border border-green-200",
    "label-purple": "bg-purple-100 text-purple-800 border border-purple-200",
    "label-orange": "bg-orange-100 text-orange-800 border border-orange-200",
    "label-cyan": "bg-cyan-100 text-cyan-800 border border-cyan-200",
    "label-gray": "bg-gray-100 text-gray-800 border border-gray-200",
    "label-yellow": "bg-yellow-100 text-yellow-800 border border-yellow-200"
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