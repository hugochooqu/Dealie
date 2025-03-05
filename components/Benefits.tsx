import { FaArrowTrendUp, FaBoltLightning, FaClock, FaEye } from "react-icons/fa6";
import Card from "./Card"

  
  const BenefitSegment = () => {
    return (
      <div className="relative min-h-auto flex flex-col bg-white overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className='m-4 flex flex-col lg:flex-row'>
          <div className="flex flex-col ">
            <h1 className='text-blue-600 pb-6'>Why AI Negotiations</h1>
            <p className=" text-3xl sm:text-4xl md:text-5xl font-bold ">Unbaised Deals.</p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold w-full md:w-[450px] pt-2">Trusted by millions of business.</p>
          </div>
          
            <p className="mt-8 lg:mt-20 lg:ml-[200px] text-gray-700 text-xl lg:text-lg">Why Ai negotiations, answer this question in two points, not more that 4 words each</p>
          
        </div>
        <div className='mt-12 grid lg:grid-cols-4 grid-cols-2  '>
          <Card
          icon={<FaBoltLightning size={20} />}
           title = 'Faster deal closure'
           desc = 'Find fully furnished apartments suited to the duration of your stay, a few months or a couple of years.'
           className="bg-blue-500"
          />
          <Card
          icon={<FaClock size={20} />}
           title = '24/7 availability'
           desc = 'Find fully furnished apartments suited to the duration of your stay, a few months or a couple of years.'
           className="bg-blue-500"
          />
          <Card
          icon={<FaEye size={20} />}
           title = 'Transparency'
           desc = 'Find fully furnished apartments suited to the duration of your stay, a few months or a couple of years.'
           className="bg-blue-500"
          />
          <Card
          icon={<FaArrowTrendUp size={20} />}
           title = 'Scalabilty'
           desc = 'Find fully furnished apartments suited to the duration of your stay, a few months or a couple of years.'
           className="bg-blue-500"
          />
      </div>
      </div>
    );
  };
  
  export default BenefitSegment;