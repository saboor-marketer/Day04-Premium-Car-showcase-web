import { Suspense, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import CompareTray from "./components/CompareTray";
import Home from "./pages/Home";
import ExploreCars from "./pages/ExploreCars";
import BrandsOverview from "./pages/BrandsOverview";
import BrandPage from "./pages/BrandPage";
import CarDetails from "./pages/CarDetails";
import CompareCars from "./pages/CompareCars";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function Loader() {
  return (
    <div className="grid min-h-[60vh] place-items-center pt-24">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#d4af37]/20 border-t-[#d4af37]" />
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">Warming up the V12…</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <div className="noise-overlay min-h-screen bg-[#060607] text-[#f5f3ec]">
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#d4af37] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-black">
            Skip to content
          </a>
          <ScrollToTop />
          <Navbar />
          <div id="main">
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<ExploreCars />} />
                <Route path="/brands" element={<BrandsOverview />} />
                <Route path="/brand/:id" element={<BrandPage />} />
                <Route path="/car/:id" element={<CarDetails />} />
                <Route path="/compare" element={<CompareCars />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
          <CompareTray />
          <BackToTop />
        </div>
      </AppProvider>
    </HashRouter>
  );
}
