import { FaCheckCircle } from "react-icons/fa";

const BenefitSegment = () => {
  const benefit = [
    {
      title: "Buyers want answers now:",
      description:
        "Negotron replies instantly, intelligently, and persuasively.",
    },
    {
      title: "It thinks like a salesperson:",
      description:
        "not a script — handling objections, price sensitivity, and indecision with tailored replies.",
    },
    {
      title: "Mimics real human behavior:",
      description:
        "Friendly, witty, professional, or assertive — Negotron matches your brand tone or sales style.",
    },
    {
      title: "Scalable across time zones:",
      description:
        "No delays, no missed leads, no ghosted messages.",
    },
    {
      title: "More deals, less effort:",
      description:
        "Convert conversations into revenue, even while you sleep.",
    },
  ];
  return (
    <div className="relative min-h-auto flex flex-col gap-6 overflow-hidden mx-auto items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-slate-50">
      <div className="text-center">
        <h1 className="text-black text-2xl lg:text-5xl font-bold">
          Why AI Negotiations?
        </h1>
      <p className="bg-gradient-to-r from-primary-200 to-primary-100 bg-clip-text text-transparent text-xl lg:text-4xl font-semibold">
          Speed, Scale, and Emotional Intelligence — All in One
        </p>
      </div>
      <div className="m-4 flex flex-col lg:flex-row max-w-7xl justify-center  lg:gap-36  text-white">
        <div className="flex flex-col text-black pt-6">
          <p className=" text-xl sm:text-lg md:text-xl font-semibold ">
            Unbaised Deals.
          </p>
          <div className="flex flex-col gap-6 pt-8 lg:w-[500px]">
          {benefit.map((benefit, index) => (
            <div key={index} className="flex flex-row gap-2 ">
              <FaCheckCircle color="orange" className="text-xl!" />
              <p className="text-lg">
                <span className="font-semibold">{benefit.title}</span>{" "}
                {benefit.description}
              </p>
            </div>
          ))}</div>
        </div>

        <video
          autoPlay
          loop
          muted
          width="390"
          height="50"
          className="border rounded-lg border-primary-200 mt-10 lg:mt-0"
        >
          <source src="/negotron demo.mp4" />
        </video>
      </div>
    </div>
  );
};

export default BenefitSegment;
