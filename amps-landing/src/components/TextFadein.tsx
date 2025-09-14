"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CinematicTextRevealProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
}

export default function CinematicTextReveal({
                                                children,
                                                delay = 0,
                                                duration = 1.8,
                                            }: CinematicTextRevealProps) {
    return (
        <div className="relative overflow-hidden inline-block">
            {/* The text */}
            <motion.span
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{
                    duration,
                    delay: delay + 0.3,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="text-4xl md:text-6xl font-bold tracking-wide text-white"
            >
                {children}
            </motion.span>

            {/* The cinematic reveal mask */}
            <motion.div
                initial={{ left: 0 }}
                animate={{ left: "100%" }}
                transition={{
                    duration,
                    delay,
                    ease: [0.77, 0, 0.175, 1], // smooth left-to-right wipe
                }}
                className="absolute top-0 bottom-0 left-0 w-full bg-black"
            />
        </div>
    );
}
