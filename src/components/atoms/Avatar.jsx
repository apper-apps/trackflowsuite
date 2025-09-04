import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Avatar = forwardRef(({ className, src, alt, size = "default", fallback, ...props }, ref) => {
  const sizes = {
    sm: "h-6 w-6 text-xs",
    default: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base",
    xl: "h-12 w-12 text-lg"
  };

  const getInitials = (name) => {
    return name
      ? name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
      : "?";
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white font-medium overflow-hidden ring-2 ring-white shadow-sm",
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : null}
      <div
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white"
        style={{ display: src ? "none" : "flex" }}
      >
        {fallback || getInitials(alt || "")}
      </div>
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;