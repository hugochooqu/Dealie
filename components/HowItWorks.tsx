'use client';
import Image from 'next/image';

const steps = [
  {
    title: 'Buyer sends a message',
    description:
      'Anywhere — website, WhatsApp, Instagram, Telegram, or live chat.',
    number: '01',
  },
  {
    title: 'Dealie engages instantly',
    description:
      'Greets the buyer, understands their intent, and initiates dynamic price negotiation based on your pre-set pricing logic and brand tone.',
    number: '02',
  },
  {
    title: 'It negotiates like a human',
    description:
      'Adapts tone, offers discounts or bundles, handles pushback, and closes the deal all in real-time.',
    number: '03',
  },
  {
    title: 'Deal is closed',
    description:
      'Once the buyer agrees, Dealie confirms the sale, collects buyer info, and notifies you. Every interaction is tracked. You can review the chat logs, monitor performance, and fine-tune behavior',
    number: '04',
  },
];

export default function HowItWorks() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1330] to-[#1a1126] pattern! py-20 overflow-hidden px-6">
      <h1 className="bg-gradient-to-r from-primary-200 to-primary-100 bg-clip-text text-transparent text-5xl tracking-wide font-bold mb-20">
        How It Works
      </h1>

      <div className="relative max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-3 gap-10 items-center">
        {/* Steps 1 & 2 (Before image on mobile/tablet) */}
        <div className="flex flex-col justify-center gap-20 md:gap-24 order-1 md:order-none">
          {steps.slice(0, 2).map((step, idx) => (
            <div key={idx} className="relative z-10">
              <span className="absolute -top-6 -left-8 text-5xl text-white/10 font-bold">
                {step.number}
              </span>
              <div className="bg-[#0a0a23] text-white p-6 rounded-xl w-full max-w-xs shadow-xl border-l-4 border-purple-600">
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/80">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="relative flex items-center justify-center order-2 md:order-none">
          <div className="w-[340px] h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src="/Ai.jpeg"
              alt="AI Woman"
              width={400}
              height={600}
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        {/* Steps 3 & 4 (After image on mobile/tablet) */}
        <div className="flex flex-col justify-center gap-20 md:gap-28 order-3 md:order-none pt-10 md:pt-40">
          {steps.slice(2).map((step, idx) => (
            <div
              key={idx}
              className="relative z-10 self-end md:text-right text-left"
            >
              <span className="absolute -top-6 -right-8 text-5xl text-white/10 font-bold md:block hidden">
                {step.number}
              </span>
              <span className="absolute -top-6 -left-8 text-5xl text-white/10 font-bold md:hidden">
                {step.number}
              </span>
              <div className="bg-[#0a0a23] text-white p-6 rounded-xl w-full max-w-xs shadow-xl border-r-4 md:border-l-0 border-l-4 md:border-r-4 border-purple-600">
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/80">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/5 to-transparent pointer-events-none"></div>
    </section>
  );
}
