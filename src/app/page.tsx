import Hero from "~/components/Hero";
import Features from "~/components/Features";
import Statistics from "~/components/Statistics";
import Testimonials from "~/components/Testimonials";
import CTA from "~/components/CTA";

export default async function HomePage() {

  return (
    <div className="flex flex-col items-center">
      <Hero />
      <Features />
      <Statistics />
      <Testimonials />
      <CTA />
    </div>
  );
}

