import { Separator } from "./ui/separator";
import WaitlistForm from "./WaitListForm";

export function EarlyAccess() {
  return (
    <section className="pattern min-h-[400px] justify-center items-center">
        <div className="max-w-7xl flex flex-col mx-8 my-6 lg:mx-28 lg:my-12 gap-4">
          <h1 className="text-4xl font-semibold bg-gradient-to-r from-primary-200 via-primary-100 to-primary-100 text-transparent bg-clip-text">Early access now open</h1>
          <p className="text-lg text-white">We&apos;re inviting 500 early sellers to join the Beta</p>
          <p className="text-lg text-white">🎁 Get exclusive access, feedback priority, and a free 30-day trial.</p>
          <WaitlistForm />
        </div>
        <div className="px-12 pt-12">
        <Separator className="text-2xl bg-gray-400 px-12" />
        </div>
        <div className="text-white text-center flex flex-col gap-2 px-8 py-8 text-lg">
          <h1>Made by Nigerians. For Real Hustlers</h1>
          <p>Built with love from Crosfect</p>
          <i className="bg-gradient-to-r from-primary-200  to-primary-100 text-transparent bg-clip-text font-semibold">Backed by the belief that every conversation can become a conversion</i>
        </div>
    </section>
  )
}
