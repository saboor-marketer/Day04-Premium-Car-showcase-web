import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="focus-gold fixed bottom-24 right-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-[#d4af37]/40 bg-black/80 text-[#eedd8a] shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition hover:bg-[#d4af37] hover:text-black sm:right-6"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
