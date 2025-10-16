import Hero from "~/components/Hero";
import Features from "~/components/Features";
import CTA from "~/components/CTA";

export default async function HomePage() {

  return (
    <div className="flex flex-col items-center">
      <Hero />
      <Features />
      <CTA />
    </div>
  );
}

