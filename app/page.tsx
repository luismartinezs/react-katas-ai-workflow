import { Cta } from "@/components/Cta";
import GradientBackground from "@/components/GradientBackground";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Cta />
      <GradientBackground
        xPosition={90}
        yPosition={5}
        from="#ef1a8e 0%"
        to="transparent 80%"
        opacity={0.2}
        radius={500}
      />
      <GradientBackground
        xPosition={10}
        yPosition={45}
        from="#691def 0%"
        to="transparent 80%"
        opacity={0.2}
        radius={750}
      />
    </>
  );
}
