import { Nav } from "@/components/navigation/Nav";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Now } from "@/components/now/Now";
import { Interests } from "@/components/interests/Interests";
import { Published } from "@/components/published/Published";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/footer/Footer";
import { GenerativeBackground } from "@/components/background/GenerativeBackground";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Luke Inglis",
  url: "https://lukeinglis.me",
  sameAs: [
    "https://github.com/lukeinglis",
    "https://www.linkedin.com/in/luke-inglis/",
  ],
  jobTitle: "Technical Product Manager",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <GenerativeBackground />
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <ProjectGrid />
        <Now />
        <Interests />
        <Published />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
