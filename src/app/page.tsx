import Booking from "@/components/Booking";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PetPlanner from "@/components/PetPlanner";
import Reveal from "@/components/Reveal";
import { Faq, FirstVisit, Footer, Plans, Services, Stories, Team } from "@/components/Sections";
import UrgencyCheck from "@/components/UrgencyCheck";
import WaFloat from "@/components/WaFloat";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <Services />
        <UrgencyCheck />
        <PetPlanner />
        <FirstVisit />
        <Plans />
        <Team />
        <Booking />
        <Stories />
        <Faq />
      </main>
      <Footer />
      <WaFloat />
      <Reveal />
    </>
  );
}
