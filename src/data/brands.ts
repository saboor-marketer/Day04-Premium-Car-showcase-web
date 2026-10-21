export interface Brand {
  id: string;
  name: string;
  tagline: string;
  description: string;
  country: string;
  founded: number;
  accent: string; // tailwind-ish hex for glow
  heroImage: string;
}

export const brands: Brand[] = [
  {
    id: "audi",
    name: "Audi",
    tagline: "Vorsprung durch Technik",
    description:
      "Ingolstadt's precision instrument. Quattro all-wheel drive, twin-turbo V8s and a screaming naturally-aspirated V10 farewell — Audi Sport blends autobahn composure with supercar pace.",
    country: "Germany",
    founded: 1909,
    accent: "#c0c5ce",
    heroImage:
      "https://images.pexels.com/photos/33983091/pexels-photo-33983091.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: "bmw",
    name: "BMW",
    tagline: "The Ultimate Driving Machine",
    description:
      "Munich's M division defines the sports sedan. From the scalpel-sharp M3 to the hybrid V8 thunder of the new M5 and XM, every M car is engineered for the driver first.",
    country: "Germany",
    founded: 1916,
    accent: "#4da3ff",
    heroImage:
      "https://images.pexels.com/photos/29580174/pexels-photo-29580174.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: "bugatti",
    name: "Bugatti",
    tagline: "If comparable, it is no longer Bugatti",
    description:
      "Molsheim hypercars beyond comparison. Quad-turbo W16 legends, the track-only Bolide and the V16-hybrid Tourbillon — each built to reset the limits of speed itself.",
    country: "France",
    founded: 1909,
    accent: "#d43a2f",
    heroImage:
      "https://images.pexels.com/photos/40055376/pexels-photo-40055376.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: "lamborghini",
    name: "Lamborghini",
    tagline: "Expect the unexpected",
    description:
      "Sant'Agata's raging bulls. Naturally-aspirated theatre in the Huracán STO, V12 plug-in fury in the Revuelto, and the 789-hp Urus SE — the fastest statement in the SUV world.",
    country: "Italy",
    founded: 1963,
    accent: "#ffb300",
    heroImage:
      "https://images.pexels.com/photos/29749205/pexels-photo-29749205.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: "toyota",
    name: "Toyota",
    tagline: "Pushing the limits for better",
    description:
      "Gazoo Racing grit meets Land Cruiser legend. A turbo triple hot hatch, a straight-six icon reborn, and the unbreakable 300 Series — performance with purpose.",
    country: "Japan",
    founded: 1937,
    accent: "#e5001a",
    heroImage:
      "https://images.pexels.com/photos/37301057/pexels-photo-37301057.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: "ferrari",
    name: "Ferrari",
    tagline: "Only those who dare, truly live",
    description:
      "Maranello's prancing horse at full gallop. Twin-turbo hybrid V6 and V8 masterpieces plus a naturally-aspirated V12 four-door — emotion engineered to the decimal.",
    country: "Italy",
    founded: 1947,
    accent: "#ff1e1e",
    heroImage:
      "https://images.pexels.com/photos/12506011/pexels-photo-12506011.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: "range-rover",
    name: "Range Rover",
    tagline: "Above and beyond",
    description:
      "British luxury that climbs mountains. Whisper-quiet Autobiography refinement, Velar minimalism and the 626-hp Sport SV — the fastest, most dynamic Range Rover ever.",
    country: "United Kingdom",
    founded: 1970,
    accent: "#9aa38a",
    heroImage:
      "https://images.pexels.com/photos/31574920/pexels-photo-31574920.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
];

export const getBrand = (id: string) => brands.find((b) => b.id === id);
