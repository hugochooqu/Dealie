const steps = [
    {
      id: 1,
      title: "Buyer makes an offer",
      description:
        "Start by outlining your negotiation objectives and priorities. Our AI will analyze your requirements to create a tailored strategy.",
      position: "left",
      image: "/3293460.jpg", // Replace with your image path
    },
    {
      id: 2,
      title: "AI negotiates in real time",
      description:
        "Our AI handles the negotiation process in real-time, ensuring transparency and fairness while maximizing your outcomes.",
      position: "right",
      image: "/6538642.jpg", // Replace with your image path
    },
    {
      id: 3,
      title: "Deal gets finalized",
      description:
        "Once the terms are finalized, you can review and approve the agreement. Faster, smarter, and hassle-free deal closures.",
      position: "left",
      image: "/10165937.jpg", // Replace with your image path
    },
  ];
  
  const HowItWorks = () => {
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 w-1 h-full bg-gray-300 transform -translate-x-1/2"></div>
  
            {/* Steps */}
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex ${
                  step.position === "left" ? "justify-start" : "justify-end"
                } mb-12`}
              >
                <div className="w-full md:w-1/2 pl-8 md:pl-0">
                  <div className="flex flex-col md:flex-row items-center gap-8 p-8 relative">
                    {/* Step Indicator */}
                    <div
                      className={`absolute top-6 ${
                        step.position === "left"
                          ? "-left-16 md:left-[92%] lg:-right-6 transform translate-x-1/2"
                          : "-left-4 lg:-left-0 transform -translate-x-1/2"
                      } w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg`}
                    >
                      {step.id}
                    </div>
  
                    {/* Image and Text */}
                    {step.position === "left" ? (
                      <>
                        {/* Image (Hidden on Mobile and Tablet) */}
                        <img
                          src={step.image}
                          alt="Illustration"
                          className="hidden md:block w-1/2 h-auto"
                        />
                        <div className="w-full md:w-1/2">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {step.title}
                          </h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-full md:w-1/2">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {step.title}
                          </h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                        {/* Image (Hidden on Mobile and Tablet) */}
                        <img
                          src={step.image}
                          alt="Illustration"
                          className="hidden md:block w-1/2 h-auto"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default HowItWorks;