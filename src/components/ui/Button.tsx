import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "option";
    size?: "sm" | "md" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

        const variants = {
            primary: "bg-text-primary text-white hover:bg-opacity-90",
            secondary: "bg-gray-100 text-text-primary hover:bg-gray-200",
            ghost: "bg-transparent hover:bg-gray-100 text-text-primary",
            option: "bg-gradient-to-r from-[rgba(198,233,247,0.1)] to-[rgba(229,248,255,0.1)] border border-[rgba(150,229,255,0.5)] text-text-primary font-semibold shadow-sm backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.01] hover:from-[rgba(198,233,247,0.6)] hover:to-[rgba(229,248,255,0.6)]"
        };

        const sizes = {
            sm: "h-9 px-3 text-sm",
            md: "h-12 px-6 text-base",
            lg: "h-16 px-8 text-lg",
            icon: "h-12 w-12 p-3"
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button, cn };
