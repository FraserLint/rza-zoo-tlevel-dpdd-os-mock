import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Content from "@/components/Content";
import OurAnimals from "@/components/OurAnimals";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen p-2">      
      <Navbar />
      <main>
        <Hero />
        <Content>
          <OurAnimals />
        </Content>
      </main>
      <Footer />
    </div>
  );
}
