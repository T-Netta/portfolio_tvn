import Hero from "@/components/sections/Hero"
import AboutSection from "@/components/sections/AboutSection"
import ProjectsSection from "@/components/sections/ProjectsSection"
import ContactSection from "@/components/sections/ContactSection"
import HobbiesSection from "@/components/sections/HobbiesSection"
import SkillsSection from "@/components/sections/SkillsSection"



export const metadata = {
  title: "Tom's Portfolio",
  description: "About Thomas Netta, web developer",
};

      
export default function Home() {
  return (

   
    <>
  
      <Hero />
      <AboutSection />
      <SkillsSection />
      <HobbiesSection />
      <ProjectsSection />
      <ContactSection />
    </>
  )
}

