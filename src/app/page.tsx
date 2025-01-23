import Hero from "@/components/Hero";
import Content from "@/components/Content";
import OurAnimals from "@/components/OurAnimals";
import Education from "@/components/Education";

export default function Home() {
  return (
    <main>
      <Hero />
      <Content>
        <OurAnimals />
      </Content>
      <div className="my-4"></div>
      <Content>
        <Education />
      </Content>
    </main>
  );
}
