"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  desc: string;
  className?: string;
}

function CardDemo({ title, desc, className }: CardProps) {
  return (
    <div className="max-w-sm w-full">
      <div
        className={cn(
          "group w-[450px] cursor-pointer overflow-hidden relative card h-96 rounded-md  mx-auto flex flex-col justify-end p-0  ",
          " bg-cover",
          // Preload hover image by setting it in a pseudo-element
          " before:fixed bg-cover before:inset-0 before:opacity-0 before:z-[-1] before:ease-out ",

          "hover:after:content-[''] hover:after:fade-in hover:ease-in-out hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
          "transition-all  duration-500",
          className
        )}
      >
        <div className="text relative z-50 bg-black opacity-50 p-4">
          <h1 className="font-bold text-xl md:text-3xl text-white relative">
            {title}
          </h1>
          <p className="font-normal text-base text-white relative my-4">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

const CaseIndustries = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-primary-100 via-primary-100 to-primary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          AI-Powered negotiation across industries
        </h2>
      </div>
      <div className="flex flex-row gap-28 px-12 sm:px-8 lg:px-16 overflow-hidden">
        <div className="flex gap-28 animate-marquee whitespace-nowrap">
          <CardDemo
            title="Agro-commerce"
            desc=""
            className="bg-[url('/955.jpg')]"
          />
          <CardDemo
            title="E-commerce"
            desc=""
            className="bg-[url('/120673.jpg')]"
          />
          <CardDemo
            title="Logistics"
            desc=""
            className="bg-[url('/2223.jpg')]"
          />
          <CardDemo
            title="B2B procurement"
            desc=""
            className="bg-[url('/18516.jpg')] hover:bg-cover"
          />
          {/* Duplicate logos for infinite scroll effect */}
          {
            <div key={`duplicate-`} className="flex gap-28 flex-row">
              <CardDemo
                title="Agro-commerce"
                desc=""
                className="bg-[url('/955.jpg')]"
              />
              <CardDemo
                title="E-commerce"
                desc=""
                className="bg-[url('/120673.jpg')]"
              />
              <CardDemo
                title="Logistics"
                desc=""
                className="bg-[url('/2223.jpg')]"
              />
              <CardDemo
                title="B2B procurement"
                desc=""
                className="bg-[url('/18516.jpg')] hover:bg-cover"
              />
            </div>
          }
        </div>
        <CardDemo
          title="Agro-commerce"
          desc=""
          className="bg-[url('/955.jpg')]"
        />
        <CardDemo
          title="E-commerce"
          desc=""
          className="bg-[url('/120673.jpg')]"
        />
        <CardDemo title="Logistics" desc="" className="bg-[url('/2223.jpg')]" />
        <CardDemo
          title="B2B procurement"
          desc=""
          className="bg-[url('/18516.jpg')] hover:bg-cover"
        />
      </div>
    </div>
  );
};

export default CaseIndustries;
