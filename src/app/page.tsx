import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen p-2">      
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}
