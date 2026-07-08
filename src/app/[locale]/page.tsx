import { Hero } from "@/components/sections/Hero/Hero";
import { FlagshipProject } from "@/components/sections/FlagshipProject/FlagshipProject";
import { OngoingProjects } from "@/components/sections/OngoingProjects/OngoingProjects";
import { About } from "@/components/sections/About/About";
import { TechStack } from "@/components/sections/TechStack/TechStack";
import { Contact } from "@/components/sections/Contact/Contact";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center">
      <Hero />
      <FlagshipProject />
      <OngoingProjects />
      <About />
      <TechStack />
      <Contact />
    </main>
  );
}
