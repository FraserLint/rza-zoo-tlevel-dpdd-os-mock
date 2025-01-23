import Hero from "@/components/Hero";
import Content from "@/components/Content";
import OurAnimals from "@/components/OurAnimals";

export default function Home() {
  return (
    <main>
      <Hero />
      <Content>
        <OurAnimals />
      </Content>
    </main>
  );
}
