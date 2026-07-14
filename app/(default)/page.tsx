export const metadata = {
  title: "Seaside Haven LLC",
  description: "Page description",
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";
import HeroHome from "@/components/hero-home";
import Header from "@/components/ui/header";

export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero />
      <Header />
      <HeroHome />
      <Workflows />
      <Features />
      <Testimonials />
      <Cta />
    </>
  );
}
