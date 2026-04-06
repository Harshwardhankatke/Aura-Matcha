import EspressoExtraction from "@/components/EspressoExtraction";
import GlobalNav from "@/components/GlobalNav";
import ProductShowcase from "@/components/ProductShowcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] selection:bg-amber-900/30 selection:text-amber-50">
      <GlobalNav />
      <EspressoExtraction />
      <ProductShowcase />
      <Footer />
    </main>
  );
}
