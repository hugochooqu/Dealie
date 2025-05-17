"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

type Feature = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  image: string;
};

const WhatItCanDo = () => {
  const features: Feature[] = [
    {
      id: "price",
      emoji: "🛍️",
      title: "Automate Price Negotiation",
      description:
        "Negotiate instantly with buyers using smart pricing logic and floor/ceiling thresholds.",
      image: "/955.jpg",
    },
    {
      id: "patterns",
      emoji: "🧠",
      title: "Learn Buyer Patterns",
      description:
        "Negotron tracks negotiation history and adapts to buyer behavior over time.",
      image: "/2223.jpg",
    },
    {
      id: "conversions",
      emoji: "📊",
      title: "Increase Conversions",
      description:
        "Respond to inquiries 24/7 and close more deals, even when you’re offline.",
      image: "/18516.jpg",
    },
    {
      id: "slang",
      emoji: "🗣️",
      title: "Speak Local Slangs",
      description:
        "Uses IP Address to detect location and talks in real local slang, emojis, and natural chat tone to win trust.",
      image: "/120673.jpg",
    },
    {
      id: "human",
      emoji: "🛡️",
      title: "Human When Needed",
      description:
        "Let buyers switch to real you with one tap — or let Negotron handle it all.",
      image: "/955.jpg",
    },
  ];

  return (
    <div className="relative min-h-auto flex flex-col gap-6 overflow-hidden px-4 sm:px-6 lg:px-8 py-12 bg-slate-50 justify-center items-center">
      <div className="max-w-7xl lg:px-28 flex flex-col lg:flex-row justify-center items-center gap-10">
        <div className="flex flex-col">
          <h1 className="bg-gradient-to-r from-primary-200 via-primary-100 to-primary-100 bg-clip-text text-transparent text-4xl font-semibold mb-4">
            What Negotron Can Do
          </h1>
          <div className="flex flex-col gap-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="border border-primary-200 rounded-2xl text-black p-4 flex flex-row gap-2 lg:w-[500px]"
              >
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold">{feature.title}</h1>
                  <p>{feature.description}</p>
                </div>
                <div className=" justify-center flex text-2xl items-center">{feature.emoji}</div>
              </div>
            ))}
          </div>
        </div>
        <div className=''>
            <Image src='/Ai1.jpeg' alt='ai' width={600} height={400} className="object-cover rounded-xl w-full h-[100%] " />
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default WhatItCanDo;
