import { About } from "@/components/About";
import { CourseSearch } from "@/components/CourseSearch";
import { Faculties } from "@/components/Faculties";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { News } from "@/components/News";
import { Research } from "@/components/Research";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Faculties />
        <Research />
        <News />
        <CourseSearch />
      </main>
      <Footer />
    </>
  );
}
