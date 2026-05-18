"use client";

import { useEffect, useState } from "react";

type Petal = {
    left: string;
    delay: string;
    duration: string;
    size: string;
};

export default function Petals() {

    const [petals, setPetals] = useState<Petal[]>([]);

    useEffect(() => {
        const generatedPetals = Array.from({ length: 25 }).map(() => ({
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 10}s`,
            duration: `${10 + Math.random() * 10}s`,
            size: `${10 + Math.random() * 12}px`,
        }));

        setPetals(generatedPetals);
    }, []);

    
    return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        {petals.map((petal, i) => (
            <span
                key={i}
                className="petal"
                style={{
                    left: petal.left,
                    animationDelay: petal.delay,
                    animationDuration: petal.duration,
                    width: petal.size,
                    height: petal.size,
                }}
            />
        ))}
    </div>
    );
}

