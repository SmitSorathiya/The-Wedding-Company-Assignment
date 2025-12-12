"use client";

import { motion } from "framer-motion";
import { cn } from "./Button";

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    return (
        <div className="flex w-full gap-2 px-4 max-w-3xl mx-auto mb-8">
            {Array.from({ length: totalSteps }).map((_, index) => {
                const isActive = index <= currentStep;
                return (
                    <div
                        key={index}
                        className={cn(
                            "h-1 flex-1 rounded-full transition-colors duration-300",
                            isActive ? "bg-[#2C3E50]" : "bg-gray-200"
                        )}
                    />
                );
            })}
        </div>
    );
}
