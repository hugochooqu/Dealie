// components/IntegrationCircle.tsx
import Image from "next/image";
import { FaPlus } from "react-icons/fa";

const icons = [
  { src: "/instagram.png", alt: "Google Drive", angle: 0 },
  { src: "/whatsapp.png", alt: "PDF", angle: 62 },
  { src: "/shopify.png", alt: "Google Docs", angle: 124 },
  { src: "/globe.svg", alt: "Web", angle: 186 },
  { src: "/telegram1.png", alt: "Notion", angle: 248 },
  { src: "/flutterwave.svg", alt: "Confluence", angle: 310 },
];

const audience = [
  {
    title: "Instagram and whatsapp sellers",
  
  },
  {
    title: "It thinks like a salesperson:",
  },
  {
    title: "Mimics real human behavior:",
  },
  {
    title: "Scalable across time zones:",
  
  },
  {
    title: "More deals, less effort:",
  
  },
];

const AiTech = () => {
  return (
    <section className="bg-slate-50  flex justify-center relative">
      <div className="flex flex-col lg:flex-row lg:gap-68 ">
        <div className="text-black lg:w-[50%] ">
          <div className="py-20 px-8">
            <h1 className="bg-gradient-to-r from-primary-200 via-primary-100 to-primary-200 text-transparent bg-clip-text text-3xl lg:text-4xl font-bold">Negotron is Ideal for</h1>
            <div className="pt-8 flex flex-col gap-6">
              {audience.map((audience, idx) => (
                <div key={idx} className="flex flex-row gap-3"> 
                  <FaPlus color="orange" />
                  <p className="text-lg">{audience.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative w-[400px] h-[400px] lg:my-12  ">
          {/* Center bot icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* Concentric circles */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`absolute rounded-full border border-primary-200 opacity-50 animate-pulse`}
                  style={{
                    width: `${i * 80}px`,
                    height: `${i * 80}px`,
                  }}
                />
              ))}
            </div>

            {/* Bot icon on top */}
            <div className="relative z-10">
              <Image src="/chat_bot.png" alt="Bot" width={80} height={80} />
            </div>
          </div>

          {/* Icons around the circle */}
          {icons.map((icon, idx) => {
            const radius = 160;
            const rad = (icon.angle * Math.PI) / 180;
            const x = radius * Math.cos(rad);
            const y = radius * Math.sin(rad);

            return (
              <div
                key={idx}
                className="absolute"
                style={{
                  top: `calc(50% + ${y}px - 24px)`,
                  left: `calc(50% + ${x}px - 24px)`,
                }}
              >
                <Image src={icon.src} alt={icon.alt} width={48} height={48} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AiTech;
