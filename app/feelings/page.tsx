import Cards from "@/components/Cards";
import Boton from "@/components/Boton";

export default function FeelingsPage() {
  return (
    <div className="relative z-30 flex flex-col min-h-screen items-center justify-center">
      <div className="sticky top-0 z-50 text-md uppercase tracking-[0.5em] text-white w-full text-center">
        pequeños pensamientos
      </div>
      <Cards />
      <Boton />
    </div>
  );
}