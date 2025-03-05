import AiTech from '@/components/AI-tech';
import BenefitSegment from '@/components/Benefits';
import CaseIndustries from '@/components/CaseIndustries';
import HowItWorks from '@/components/HowItWorks';
import LogoCarousel from '@/components/LogoCarousel';
import {Testimonials} from '@/components/Testimonials';

import Link from 'next/link';

const Home = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text and Call-to-Action Section */}
          <div className="md:w-1/2 text-center md:text-left fade-in ">
            <h1 className="text-6xl font-semibold text-black sm:text-5xl lg:text-6xl pt-16 md:pt-0  ">
            AI-Powered  <span className='text-purple-600 animate-pulse'>Negotiation</span> Chat System 
            </h1>
            <p className="mt-4 text-lg text-gray-600">
            Get the best deals, 24/7, without human effort. 
            </p>
            <div className="mt-8">
              <Link
                href="/demo"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-purple-800"
              >
                Start Demo
              </Link>
            </div>
          </div>

          {/* Illustration Section (Hidden on Mobile and Tablet) */}
          <div className="hidden md:block md:w-1/2 fade-in">
            <img
              src="/5174540.jpg" // Replace with your illustration path
              alt="Illustration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      <LogoCarousel />
      <BenefitSegment />
      <HowItWorks />
      <CaseIndustries />
      <AiTech />
      <Testimonials />
    </div>
  );
};

export default Home;