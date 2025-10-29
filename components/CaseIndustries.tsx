"use client";

import React from "react";
import { motion } from "framer-motion";

interface UseCase {
  title: string;
  desc: string;
  icon: string;
}

const useCases: UseCase[] = [
  {
    title: "Customer Support",
    desc: "Dealie resolves refund and cancellation requests by negotiating fair credits or replacements. It re-engages inactive customers with personalized offers, reducing churn, boosting loyalty, and improving overall customer satisfaction.",
    icon: "https://cdn.prod.website-files.com/6643307d563d3d1613330141/66447eea332688601b9affd1_body-5.svg",
  },
  {
    title: "Human Resources",
    desc: "Dealie helps HR negotiate flexible benefits, contractor agreements, and training costs. It automates vendor and employee discussions, ensuring fair outcomes while saving time, cutting costs, and improving HR efficiency.",
    icon: "https://cdn.prod.website-files.com/6643307d563d3d1613330141/66447eea9cb1de9e6b572e92_body-4.svg",
  },
  {
    title: "E-commerce",
    desc: "Dealie drives real-time checkout negotiations with discounts, bundles, and shipping deals. It re-engages abandoned carts through smart offers, converting hesitant shoppers while protecting vendor margins with intelligent guardrails.",
    icon: "https://cdn.prod.website-files.com/6643307d563d3d1613330141/66447eea41d8f710902e871d_body-3.svg",
  },
  {
    title: "B2B Procurement",
    desc: "Dealie streamlines procurement by negotiating bulk discounts, delivery timelines, and contracts. It ensures budgets are maintained while benchmarking across vendors, helping businesses cut costs and strengthen supplier relationships.",
    icon: "https://cdn.prod.website-files.com/6643307d563d3d1613330141/66447eea73ea50fbc6052ccb_body-2.svg",
  },
  {
    title: "Logistics",
    desc: "Dealie negotiates shipping terms, insurance, and last-mile charges with logistics providers. It also resolves disputes for damaged goods, ensuring fair outcomes and helping businesses reduce costs across supply chains.",
    icon: "https://cdn.prod.website-files.com/6643307d563d3d1613330141/66447eeaac0153d4eed057f9_body-1.svg",
  },
  {
    title: "Retail",
    desc: "Dealie supports retailers by negotiating loyalty redemptions, discounts, and supplier restocks. It enables dynamic customer deals while ensuring profitability, helping stores increase revenue and maintain smooth supplier and shopper relationships.",
    icon: "https://cdn.prod.website-files.com/6643307d563d3d1613330141/66447eeff242b45edaee3d32_body.svg",
  },
  {
    title: "Agro-commerce",
    desc: "Dealie empowers farmers and buyers to negotiate crop prices fairly. It supports bulk purchase deals, prevents middleman exploitation, and facilitates cross-border trade, ensuring equitable outcomes for both smallholders and distributors.",
    icon: "https://cdn.prod.website-files.com/6643307d563d3d1613330141/66447eea332688601b9affd1_body-5.svg", // placeholder icon
  },
];

function UseCaseCard({ title, desc, icon }: UseCase) {
  return (
    <div className="bg-[#1e0036] rounded-2xl border border-[#3a0a6a] shadow-md p-6 w-80 h-[320px] max-w-sm flex-shrink-0 flex flex-col justify-start">
      {/* Icon with glow */}
      <div className="flex justify-center mb-4">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 blur-xl opacity-70"></div>
          <img
            src={icon}
            alt={title}
            className="relative z-10 w-20 h-20 rounded-full object-cover border-2 border-white"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white text-center mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-300 leading-relaxed text-center break-words whitespace-normal">
        {desc}
      </p>
    </div>
  );
}

const CaseIndustries = () => {
  return (
    <section className="bg-gradient-to-b from-[#2d0c4a] to-[#1a0030] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Dealie Use Cases
          </h2>
          <h3 className="text-3xl font-bold text-white mt-2">
            Across Industries
          </h3>
          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
            Explore how our AI agent not only respond to queries but also manage
            complex tasks, enhancing efficiency and experience across various
            sectors.
          </p>
        </div>

        {/* Continuous slider */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -2000] }}
            transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
          >
            {useCases.concat(useCases).map((uc, idx) => (
              <UseCaseCard key={idx} {...uc} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaseIndustries;
