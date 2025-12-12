import { HTMLAttributes, forwardRef } from "react";
import { cn } from "./Button"; // Reusing cn utility

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    glass?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, glass = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-3xl p-6",
                    glass ? "glass-panel" : "bg-card-inner rounded-[42px] shadow-sm",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";

export { Card };
