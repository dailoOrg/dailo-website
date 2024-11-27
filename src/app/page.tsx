import AnimatedGradientScroll from "@/components/AnimatedGradientScroll";
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Featured from '@/components/Featured'

export default function Home() {
  return (
    <div className="relative">
      <AnimatedGradientScroll />
      
      <div className="relative z-10">
        <Hero />
        <Features />
        <Featured />
      </div>
    </div>
  );
}
