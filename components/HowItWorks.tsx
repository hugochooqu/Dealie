'use client';
import Image from 'next/image';

const steps = [
  {
    title: 'Buyer sends a message',
    description:
      'Anywhere — website, WhatsApp, Instagram, Telegram, or live chat.',
    position: 'left',
    number: '01',
  },
  {
    title: 'It negotiates like a human',
    description:
      'Adapts tone, offers discounts or bundles, handles pushback, and closes the deal all in real-time..',
    position: 'left',
    number: '03',
  },
  {
    title: 'Negotron engages instantly',
    description:
      'Greets the buyer, understands their intent, and initiates dynamic price negotiation based on your pre-set pricing logic and brand tone.',
    position: 'right',
    number: '02',
  },
  {
    title: 'Deal is closed',
    description:
      'Once the buyer agrees, Negotron confirms the sale, collects buyer info, and notifies you. Every interaction is tracked. You can review the chat logs, monitor performance, and fine-tune behavior',
    position: 'right',
    number: '04',
  },
];

export default function HowItWorks() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1330] to-[#1a1126] pattern! py-20 overflow-hidden px-6">
      <h1 className='bg-gradient-to-r from-primary-200 to-primary-100 bg-clip-text text-transparent text-5xl tracking-wide font-bold'>How It Works</h1>
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        {/* Left Side Steps */}
        <div className="flex flex-col justify-center gap-24 relative">
          {steps
            .filter((s) => s.position === 'left')
            .map((step, idx) => (
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

        {/* Center Image */}
        <div className="relative flex items-center justify-center z-10">
          <div className="w-[340px] h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src="/955.jpg"
              alt="AI Woman"
              width={400}
              height={600}
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        {/* Right Side Steps */}
        <div className="flex flex-col justify-center gap-28 relative pt-40">
          {steps
            .filter((s) => s.position === 'right')
            .map((step, idx) => (
              <div key={idx} className="relative z-10 self-end text-right">
                <span className="absolute -top-6 -right-8 text-5xl text-white/10 font-bold">
                  {step.number}
                </span>
                <div className="bg-[#0a0a23] text-white p-6 rounded-xl w-full max-w-xs shadow-xl border-r-4 border-purple-600">
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-white/80">
                    {step.description}
                  </p>
                </div>
                 
                
              </div>
            ))}
        </div>
      </div>

      {/* Optional background gradient or blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/5 to-transparent pointer-events-none"></div>
    </section>
  );
}
