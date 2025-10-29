"use client"

import { useState } from "react";
import { motion } from "framer-motion";

export default function Loyalty() {
  const [loyalty, setLoyalty] = useState(0); // 0 = first-time, 100 = loyal customer

  // Negotiation range: tighter at 0, wider at 100
  const minPrice = 90 - Math.floor(loyalty / 5); // e.g. wider as loyalty grows
  const maxPrice = 100;

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-black via-[#0a0015] to-black text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Loyalty Pays Off with Dealie
      </h2>
      <p className="text-gray-300 mb-10 max-w-xl mx-auto">
        The more you buy, the better your deals get. Loyal customers unlock more
        negotiation flexibility.
      </p>

      {/* Slider */}
      <div className="flex flex-col items-center gap-6 max-w-lg mx-auto">
        <input
          type="range"
          min="0"
          max="100"
          value={loyalty}
          onChange={(e) => setLoyalty(Number(e.target.value))}
          className="w-full accent-purple-500"
        />

        {/* Negotiation range bar */}
        <div className="w-full bg-gray-700 rounded-2xl h-12 relative overflow-hidden shadow-lg">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-orange-400 rounded-2xl"
            animate={{
              width: `${20 + loyalty * 0.6}%`, // grows as loyalty increases
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Price display */}
        <div className="flex justify-between w-full text-sm md:text-base font-mono">
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>

        {/* Labels */}
        <div className="flex justify-between w-full mt-2 text-xs text-gray-400">
          <span>First-time Customer</span>
          <span>Loyal Customer</span>
        </div>
      </div>
    </section>
  );
}
