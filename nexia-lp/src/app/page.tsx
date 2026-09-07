import Hero from "@/components/home/Hero";
import AudienceNav from "@/components/home/AudienceNav";
import Vision from "@/components/home/Vision";
import Problem from "@/components/home/Problem";
import Perspectives from "@/components/home/Perspectives";
import Model from "@/components/home/Model";
import Cycle from "@/components/home/Cycle";
import Activities from "@/components/home/Activities";
import Roadmap from "@/components/home/Roadmap";
import Partners from "@/components/home/Partners";
import Future from "@/components/home/Future";
import NewsPreview from "@/components/home/NewsPreview";
import FaqSection from "@/components/home/FaqSection";
import Cta from "@/components/home/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <AudienceNav />
      <Vision />
      <Problem />
      <Perspectives />
      <Model />
      <Cycle />
      <Activities />
      <Roadmap />
      <Partners />
      <Future />
      <NewsPreview />
      <FaqSection />
      <Cta />
    </>
  );
}
