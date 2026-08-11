import { Nav } from "@/components/navigation/Nav";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/footer/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Luke Inglis",
  url: "https://lukeinglis.me",
  sameAs: [
    "https://github.com/lukeinglis",
    "https://linkedin.com/in/lukeinglis",
  ],
  jobTitle: "Software Engineer",
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
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <ProjectGrid />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
