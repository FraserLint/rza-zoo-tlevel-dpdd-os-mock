import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Content from "@/components/Content";

export default function Home() {
  return (
    <div className="min-h-screen p-2">      
      <Navbar />
      <main>
        <Hero />
        <Content>
          {/* Content will be added here */}
          <div></div>
        </Content>
      </main>
    </div>
  );
}
