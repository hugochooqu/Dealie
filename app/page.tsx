import AiTech from '@/components/AI-tech';
import BenefitSegment from '@/components/Benefits';
import CaseIndustries from '@/components/CaseIndustries';
import HowItWorks from '@/components/HowItWorks';
import LogoCarousel from '@/components/LogoCarousel';
import Navbar from '@/components/Navbar';
import {Testimonials} from '@/components/Testimonials';
import WhatItCanDo from '@/components/WhatItCanDo';

import Link from 'next/link';
import { FaPlayCircle } from 'react-icons/fa';

const Home = () => {
  return (
    <div className='pattern'>
      {/* <Navbar /> */}
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:h-screen">
        <div className="flex flex-col items-center">
          <div className=" text-center fade-in lg:max-w-5xl pt-20  ">
            <h1 className="text-4xl font-semibold text-white sm:text-5xl lg:text-5xl pt-16 md:pt-0  ">
            Turn Conversations into <span className='bg-gradient-to-r from-primary-200 to-primary-100 bg-clip-text text-transparent '>Conversions</span>, Automatically
            </h1>
            <p className="mt-4 text-lg text-gray-300 lg:px-8">
            Negotron is a dynamic, human-like negotiation chatbot that mimics real sales personas, adapts to buyer behavior, and drives conversions 24/7 — across any platform. 
            </p>
            <div className="mt-8 flex flex-row gap-6 justify-center items-center pb-6">
              <Link
                href="/demo"
                className="inline-block bg-gradient-to-r from-primary-200 to-primary-100 text-white px-6 py-3 rounded-xl text-sm md:text-lg font-medium hover:bg-purple-800"
              >
                Try Negotron free
              </Link>
              <Link
                href="/demo"
                className="flex bg-white text-black px-6 py-3 rounded-xl  text-sm md:text-lg font-medium  flex-row gap-2"
              >
                Watch Live Demo <FaPlayCircle color='red' className='pt-1 text-sm' />
              </Link>
            </div>
            <i className=''>&apos;Automate your sales conversations without losing the human touch.&apos;</i>
          </div>
        </div>
      </div>
      {/* <LogoCarousel /> */}
      <BenefitSegment />
      <WhatItCanDo />
      <HowItWorks />  
      <CaseIndustries />
      <AiTech />
      <Testimonials />
    </div>
  );
};

export default Home;