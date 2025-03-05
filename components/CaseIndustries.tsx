"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface CardProps {
    title: string,
    desc: string,
    className?: string
}

function CardDemo({title, desc, className} : CardProps ) {
  return (
    <div className="max-w-xs w-full">
      <div
        className={cn(
          "group w-full cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
          "bg-purple-500 bg-cover",
          // Preload hover image by setting it in a pseudo-element
          " before:fixed bg-cover before:inset-0 before:opacity-0 before:z-[-1] before:ease-out ",
          
          "hover:after:content-[''] hover:after:fade-in hover:ease-in-out hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
          "transition-all  duration-500", className
        )}
      >
        <div className="text relative z-50">
          <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
            {title}
          </h1>
          <p className="font-normal text-base text-gray-50 relative my-4">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

const CaseIndustries = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          AI-Powered negotiation across industries
        </h2>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-12 sm:px-8 lg:px-16'>
        <CardDemo title='Agro-commerce' desc= 'nothing' className="before:bg-[url('/955.jpg')] hover:bg-[url('/955.jpg')]"/>
        <CardDemo title='E-commerce' desc= 'nothing' className="before:bg-[url('/120673.jpg')] hover:bg-[url('/120673.jpg')]"/>
        <CardDemo title='Logistics' desc= 'nothing' className="before:bg-[url('/2223.jpg')] hover:bg-[url('/2223.jpg')]"/>
        <CardDemo title='B2B procurement' desc= 'nothing' className="before:bg-[url('/18516.jpg')] hover:bg-[url('/18516.jpg')] hover:bg-cover"/>
      </div>
    </div>
  );
};

export default CaseIndustries;
