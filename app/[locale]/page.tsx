import Header from "@/components/layout/Header/Header";
import Hero from "@/components/sections/Hero/Hero";
import AboutMe from "@/components/sections/AboutMe/AboutMe";
import Works from "@/components/sections/Works/Works";
import Projects from "@/components/sections/Projects/Projects";
import Footer from "@/components/layout/Footer/Footer";
import BottomNavigation from "@/components/layout/BottomNavigation/BottomNavigation";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutMe />
        <Works />
        <Projects />
      </main>
      <Footer />
      <BottomNavigation />
    </>
  );
}
