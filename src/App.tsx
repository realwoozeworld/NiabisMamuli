import { useState } from "react"
import heroImage from "./imports/hero.png"
import mapImage from "./imports/hero.png"

const sector1Image = new URL(
  "./imports/Gemini_Generated_Image_p2flhnp2flhnp2fl.jfif",
  import.meta.url,
).href

type SectorId = 1 | 2 | 3
type Page = "landing" | "map" | SectorId

/* ─── Data types ────────────────────────────────────────────────────── */

interface POI {
  name: string
  en: string
  // position on sector1-design.png as % (image is 4096×2180)
  left: string
  top: string
  description: string
  details: string[]
}

interface SectorInfo {
  id: SectorId
  labelGeo: string
  subtitleGeo: string
  subtitleEn: string
  left: string
  top: string
  units: string
  unitsLabel: string
  tagline: string
  description: string
  features: string[]
  statusColor: string
  detailImage?: string
  pois?: POI[]
}

/* ─── Sector 1 POI data ─────────────────────────────────────────────── */

const SECTOR1_POIS: POI[] = [
  {
    name: "საკონსერვე სანარმო",
    en: "Canning Facility",
    left: "7.9%",
    top: "23.5%",
    description:
      "ადგილობრივი ჯემების, კომპოტების, სეზონური კონსერვებისა და მარინადების წარმოება. ყველა პროდუქტი მზადდება ნიაბის მამულის პირდაპირი ნედლეულიდან — ხელნაკეთი, ბუნებრივი, ყოველგვარი შენარჩუნებელი ნივთიერების გარეშე.",
    details: [
      "ხელნაკეთი კონსერვები",
      "ჯემები და კომპოტები",
      "ბუნებრივი ინგრედიენტები",
      "სუვენირად ხელმისაწვდომი",
    ],
  },
  {
    name: "სამაცივრე სივრცე",
    en: "Cold Storage",
    left: "12.05%",
    top: "14.74%",
    description:
      "სპეციალიზებული სამაცივრე სივრცე ახლად მოყვანილი პროდუქტებისა და ბოსტნეულის შესანახად. ნიაბის მამულის ფერმიდან პირდაპირ მომხმარებლამდე — სრული სიახლე და ხარისხი.",
    details: [
      "განახლებული ტექნოლოგია",
      "ოპტიმალური ტემპერატურის კონტროლი",
      "ახლად მოყვანილი პროდუქცია",
      "ყოველდღიური შევსება",
    ],
  },
  {
    name: "სატბური ორანჟერია",
    en: "Heated Orangery",
    left: "21.85%",
    top: "35%",
    description:
      "თანამედროვე სათბური ორანჟერია, სადაც მრავალსახეობიანი ეგზოტიკური და ადგილობრივი მცენარეები ხარობს. სტუმრებს შეუძლიათ ეწვიონ და უშუალოდ ნახონ პროდუქციის ზრდის პროცესი.",
    details: [
      "ეგზოტიკური და ადგილობრივი მცენარეები",
      "ტემპერატურით კონტროლირებადი",
      "ეკოტური ვიზიტები",
      "სეზონური ნაყოფი",
    ],
  },
  {
    name: "სატბური ორანჟერია",
    en: "Heated Orangery",
    left: "28.50%",
    top: "45%",
    description:
      "თანამედროვე სათბური ორანჟერია, სადაც მრავალსახეობიანი ეგზოტიკური და ადგილობრივი მცენარეები ხარობს. სტუმრებს შეუძლიათ ეწვიონ და უშუალოდ ნახონ პროდუქციის ზრდის პროცესი.",
    details: [
      "ეგზოტიკური და ადგილობრივი მცენარეები",
      "ტემპერატურით კონტროლირებადი",
      "ეკოტური ვიზიტები",
      "სეზონური ნაყოფი",
    ],
  },
  {
    name: "სატბური ორანჟერია",
    en: "Heated Orangery",
    left: "35%",
    top: "55%",
    description:
      "თანამედროვე სათბური ორანჟერია, სადაც მრავალსახეობიანი ეგზოტიკური და ადგილობრივი მცენარეები ხარობს. სტუმრებს შეუძლიათ ეწვიონ და უშუალოდ ნახონ პროდუქციის ზრდის პროცესი.",
    details: [
      "ეგზოტიკური და ადგილობრივი მცენარეები",
      "ტემპერატურით კონტროლირებადი",
      "ეკოტური ვიზიტები",
      "სეზონური ნაყოფი",
    ],
  },
  {
    name: "ღია ბოსტანი",
    en: "Ghia's Vegetable Garden",
    left: "53.58%",
    top: "72%",
    description:
      "ლიას სახელობის ბოსტანი — პირადი ეკო-ბოსტანი, სადაც ნიაბის მამულის ოჯახის ტრადიციებით გამოზრდილი ბოსტნეული ხარობს. სტუმრებს შეუძლიათ მონაწილეობა მიიღონ ბოსტნეულის კრეფაში.",
    details: [
      "ეკო ბოსტნეული",
      "ტრადიციული ჯიშები",
      "სტუმართა მონაწილეობა კრეფაში",
      "სეზონური მოსავალი",
    ],
  },
  {
    name: "ღია ბოსტანი",
    en: "Ghia's Vegetable Garden",
    left: "44.50%",
    top: "72%",
    description:
      "ლიას სახელობის ბოსტანი — პირადი ეკო-ბოსტანი, სადაც ნიაბის მამულის ოჯახის ტრადიციებით გამოზრდილი ბოსტნეული ხარობს. სტუმრებს შეუძლიათ მონაწილეობა მიიღონ ბოსტნეულის კრეფაში.",
    details: [
      "ეკო ბოსტნეული",
      "ტრადიციული ჯიშები",
      "სტუმართა მონაწილეობა კრეფაში",
      "სეზონური მოსავალი",
    ],
  },
  {
    name: "ხეხილის ბალები",
    en: "Khekili Meadows",
    left: "16%",
    top: "28%",
    description:
      'ნიაბის მამულის განთქმული "კეხილის ბალები" — ტრადიციული ქართული სახელწოდება. ეს ბუნებრივი მდელო ლურჯი ყვავილებით, ალვის ხეებითა და ტრადიციული ბალახეულებით გაჯერებული ზონაა.',
    details: [
      "ბუნებრივი მდელო",
      "ტრადიციული ბალახეული",
      "სეირნობის ბილიკები",
      "ფოტო ადგილი",
    ],
  },
  {
    name: "ვაერდების ბალო ბოსტანი",
    en: "Vaerd's Meadow Garden",
    left: "39.05%",
    top: "60%",
    description:
      "ვაერდების ბალოს ბოსტნეული — ვრცელი ღია ბოსტანი, სადაც სხვადასხვა ბოსტნეული და ბალახეული კულტურები ხარობს. ეს ტერიტორია ახლო კონტაქტს ქმნის ბუნებასა და სოფლის ტრადიციებთან.",
    details: [
      "ვრცელი ღია ბოსტანი",
      "სხვადასხვა სეზონური კულტურები",
      "ბუნებასთან კონტაქტი",
      "საგანმანათლებლო ვიზიტები",
    ],
  },
  {
    name: "კოტეჯები",
    en: "Cottages",
    left: "67%",
    top: "72%",
    description:
      "ნიაბის მამულის კომფორტული კოტეჯები ოჯახებისა და წყვილებისთვის. ყველა კოტეჯი გამზადებულია ბუნებრივი მასალებით, სიმყუდროვით და მრავალი სეზონური სიამოვნებით.",
    details: [
      "ბუნებრივი მასალები",
      "სრული კომფორტი",
      "ოჯახური გათვლა",
      "4-სეზონიანი ინფრასტრუქტურა",
    ],
  },
  {
    name: "ღონისძიებების სივრცე",
    en: "Event Space",
    left: "76.8%",
    top: "69.80%",
    description:
      "მრავალფუნქციური ღონისძიებების სივრცე — ქორწილი, კორპორატიული ღონისძიება, პრეზენტაცია ან კულტურული ივენთი. სრული ლოჯისტიკური მხარდაჭერა და კეტერინგი.",
    details: [
      "ქორწილი და ვიზიტი",
      "კორპორატიული ღონისძიება",
      "სრული კეტერინგი",
      "ტექნიკური მხარდაჭერა",
    ],
  },
  {
    name: "სასადილო",
    en: "Dining Room",
    left: "80.02%",
    top: "61.5%",
    description:
      "ნიაბის მამულის სასადილო — ადგილობრივი ქართული სამზარეულო ეკო-პროდუქტებიდან. სეზონური მენიუ, ახლად მოყვანილი ბოსტნეული და ფერმის პირდაპირი პროდუქცია.",
    details: [
      "ადგილობრივი ეკო-სამზარეულო",
      "სეზონური მენიუ",
      "ფერმიდან პირდაპირ მაგიდაზე",
      "ქართული ტრადიციული კერძები",
    ],
  },
  {
    name: "ხელოვნური ტბა",
    en: "Artificial Lake",
    left: "84.65%",
    top: "61.5%",
    description:
      "ლამაზად გამოყვანილი ხელოვნური ტბა სეირნობის ბილიკებით, სახეობრივი ხიდებითა და ბუნებრივი ლანდშაფტით. სტუმრებს შეუძლიათ ნავობა, თევზაობა და ბუნებური დასვენება.",
    details: [
      "ნავობა",
      "სპორტული თევზაობა",
      "სეირნობის ბილიკები",
      "ბუნებური ლანდშაფტი",
    ],
  },
  {
    name: "მაღაზიები ადგილობრივი ნანარმის",
    en: "Local Produce Shops",
    left: "83.4%",
    top: "68.70%",
    description:
      "ნიაბის მამულის ფერმიდან პირდაპირ — ახლად მოყვანილი ბოსტნეული, ხილი, ჯემები, კონსერვები, თაფლი და ადგილობრივი ხელნაკეთი პროდუქცია. სუვენირებიც ხელმისაწვდომია.",
    details: [
      "ახალი ბოსტნეული და ხილი",
      "ხელნაკეთი კონსერვები",
      "ადგილობრივი თაფლი",
      "სუვენირი და საჩუქრები",
    ],
  },
  {
    name: "სპა ცენტრი",
    en: "Spa Center",
    left: "72.85%",
    top: "61.5%",
    description:
      "სრული დასვენებისა და განახლების სპა ცენტრი. სთავაზობს ტრადიციულ ქართულ და თანამედროვე სპა-პროცედურებს, მასაჟებს, ბანაობებს და სილამაზის მომსახურებებს.",
    details: [
      "ქართული ტრადიციული სპა",
      "მასაჟ-თერაპია",
      "სილამაზის პროცედურები",
      "კერძო სესიები",
    ],
  },
  {
    name: "საცურაო აუზი 4 სეზონი",
    en: "4-Season Swimming Pool",
    left: "76.1%",
    top: "61.5%",
    description:
      "გახურებული 4-სეზონიანი საცურაო აუზი, რომელიც ხელმისაწვდომია წლის ნებისმიერ დროს. პანორამული ხედი, ჰიდრო-მასაჟი და სპეციალური ბავშვთა ზონა.",
    details: [
      "გახურებული 4-სეზონი",
      "პანორამული ხედი",
      "ჰიდრო-მასაჟი",
      "ბავშვთა ზონა",
    ],
  },
]

const SECTORS: SectorInfo[] = [
  {
    id: 1,
    labelGeo: "1 სექტორი",
    subtitleGeo: "მასპინძლობის სექტორი",
    subtitleEn: "მასპინძლობის სექტორი",
    left: "18%",
    top: "72%",
    units: "—",
    unitsLabel: "",
    tagline: "სასტუმრო და სერვისები",
    description:
      "მასპინძლობის სექტორი — ნიაბის მამულის ცენტრალური სასტუმრო-სერვის ზონა.",
    features: [
      "კოტეჯები",
      "სპა ცენტრი",
      "საცურაო აუზი 4 სეზონი",
      "სასადილო",
      "ღონისძიებების სივრცე",
      "ხელოვნური ტბა",
    ],
    statusColor: "#c9a84c",
    detailImage: sector1Image,
    pois: SECTOR1_POIS,
  },
  {
    id: 2,
    labelGeo: "2 სექტორი",
    subtitleGeo: "სააგარაკე უბანი",
    subtitleEn: "სააგარაკე უბანი",
    left: "39%",
    top: "65%",
    units: "16",
    unitsLabel: "აგარაკი · 36 ნაკვეთი",
    tagline: "კეხილის ბალები — 16 აგარაკები",
    description:
      'სააგარაკე უბანი "კეხილის ბალები" — 36 ნაკვეთი სულ, 16 მზა აგარაკით.',
    features: [
      "სულ 36 ნაკვეთი",
      "16 მზა აგარაკი",
      "ბუნებრივი გარემო",
      "სათემო ინფრასტრუქტურა",
    ],
    statusColor: "#4ade80",
  },
  {
    id: 3,
    labelGeo: "3 სექტორი",
    subtitleGeo: "სანერგე / სასათბურე მეურნეობა",
    subtitleEn: "სანერგე / სასათბურე მეურნეობა",
    left: "53%",
    top: "43%",
    units: "—",
    unitsLabel: "სანერგე · ტყე",
    tagline: "ნიწვოვანი მცენარეების სანერგე / ტყე",
    description: 'სანერგე-სასათბურე სექტორი — ნიაბის მამულის "მწვანე ფილტვი".',
    features: [
      "ნიწვოვანი მცენარეების სანერგე",
      "ბუნებრივი ტყის ზონა",
      "სასათბურე მეურნეობა",
      "გარემოსდაცვითი ბუფერი",
    ],
    statusColor: "#86efac",
  },
]

/* ─── POI detail page ───────────────────────────────────────────────── */

function PoiDetailPage({
  poi,
  sector,
  onBack,
}: {
  poi: POI
  sector: SectorInfo
  onBack: () => void
}) {
  return (
    <div className="page-enter min-h-screen bg-[#0a0e0a] flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-[#1a281a]">
        <button
          onClick={onBack}
          className="flex items-center gap-2.5 text-[#6a8e5a] hover:text-[#c9a84c] transition-colors duration-200 group"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="group-hover:-translate-x-0.5 transition-transform duration-150"
          >
            <path
              d="M10 3L5 8L10 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[10px] tracking-[0.25em] uppercase font-['Outfit']">
            {sector.labelGeo}
          </span>
        </button>
        <span className="font-['Fraunces'] text-[#c9a84c] text-sm tracking-widest">
          ნიაბის მამული
        </span>
        <span
          className="text-[9px] tracking-[0.3em] uppercase font-['Outfit'] px-2 py-1 border hidden sm:inline-block"
          style={{ color: sector.statusColor, borderColor: sector.statusColor }}
        >
          {sector.subtitleEn}
        </span>
      </nav>

      {/* Body */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 sm:px-10 py-12 sm:py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-[#3a4e2a] text-[10px] font-['Outfit'] tracking-widest uppercase">
            {sector.labelGeo}
          </span>
          <span className="text-[#1a281a]">·</span>
          <span className="text-[#6a8e5a] text-[10px] font-['Outfit'] tracking-widest uppercase">
            {poi.en}
          </span>
        </div>

        {/* Title */}
        <div className="mb-10">
          <h2 className="font-['Fraunces'] text-5xl sm:text-6xl text-[#f0ead8] font-light leading-none tracking-tight mb-3">
            {poi.name}
          </h2>
          <p className="font-['Fraunces'] italic text-[#6a8e5a] text-lg">
            {poi.en}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-[#1a281a]" />
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: sector.statusColor }}
          />
          <div className="flex-1 h-px bg-[#1a281a]" />
        </div>

        {/* Description */}
        <div className="mb-10">
          <p className="text-[9px] tracking-[0.35em] uppercase text-[#c9a84c] mb-4 font-['Outfit']">
            შესახებ
          </p>
          <p className="text-[#c8bda0] leading-relaxed text-base font-['Outfit'] font-light">
            {poi.description}
          </p>
        </div>

        {/* Details list */}
        <div className="mb-12">
          <p className="text-[9px] tracking-[0.35em] uppercase text-[#c9a84c] mb-5 font-['Outfit']">
            მომსახურება
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {poi.details.map((d, i) => (
              <li
                key={i}
                className="flex items-center gap-3 py-3 px-4 border border-[#1a281a] hover:border-[#2a3a2a] transition-colors"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: sector.statusColor, opacity: 0.8 }}
                />
                <span className="text-[#a89e88] font-['Outfit'] text-sm">
                  {d}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-8 border-t border-[#1a281a]">
          <button
            className="px-8 py-3.5 text-[#0a0e0a] text-[10px] tracking-[0.35em] uppercase font-['Outfit'] font-semibold hover:opacity-90 transition-opacity"
            style={{ background: sector.statusColor }}
          >
            დაგვიკავშირდით
          </button>
          <button
            onClick={onBack}
            className="px-6 py-3.5 border border-[#1a281a] text-[#6a8e5a] hover:border-[#c9a84c] hover:text-[#c9a84c] text-[10px] tracking-[0.35em] uppercase font-['Outfit'] transition-all duration-200"
          >
            რუკაზე დაბრუნება
          </button>
        </div>
      </div>

      <footer className="px-6 sm:px-10 py-4 border-t border-[#1a281a] flex items-center justify-between">
        <p className="text-[#2a3a2a] text-[9px] tracking-widest uppercase font-['Outfit']">
          ნიაბის მამული · ნიაბის მამული
        </p>
        <p className="text-[#2a3a2a] text-[9px] tracking-widest font-['Outfit']">
          © 2026
        </p>
      </footer>
    </div>
  )
}

/* ─── Sector map page (with POI overlay buttons) ────────────────────── */

function SectorMapPage({
  sector,
  onBack,
  onNavigate,
  onSelectPoi,
}: {
  sector: SectorInfo
  onBack: () => void
  onNavigate: (id: SectorId) => void
  onSelectPoi: (poi: POI) => void
}) {
  const [hoveredPoi, setHoveredPoi] = useState<number | null>(null)

  return (
    <div className="page-enter relative w-full h-screen overflow-hidden bg-[#0a0e0a]">
      {/* Full-screen sector image */}
      <img
        src={sector.detailImage}
        alt={sector.labelGeo}
        className="w-full h-full object-cover object-center"
        style={{ filter: "brightness(0.88)" }}
      />

      {/* Top-left title */}
      <div className="absolute top-0 left-0 z-20">
        <div
          className="px-5 py-3"
          style={{
            background: "rgba(0,0,0,0.84)",
            backdropFilter: "blur(4px)",
          }}
        >
          <h2
            className="font-['Fraunces'] font-bold leading-none tracking-wide"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "#c9a84c" }}
          >
            {sector.labelGeo}
          </h2>
          <p className="text-[#8a9e7a] text-[10px] tracking-[0.25em] uppercase font-['Outfit'] mt-1">
            {sector.subtitleGeo}
          </p>
        </div>
      </div>

      {/* Top-right back button */}
      <div className="absolute top-0 right-0 z-20 p-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 border border-[#2a3a2a] font-['Outfit'] text-[10px] tracking-widest uppercase transition-all duration-200 hover:border-[#c9a84c] group"
          style={{
            background: "rgba(0,0,0,0.75)",
            color: "#6a8e5a",
            backdropFilter: "blur(6px)",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="group-hover:-translate-x-0.5 transition-transform"
          >
            <path
              d="M8 2L4 6L8 10"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="group-hover:text-[#c9a84c] transition-colors">
            რუკა
          </span>
        </button>
      </div>

      {/* POI overlay buttons — positioned over each baked-in label */}
      {sector.pois?.map((poi, i) => {
        const isHov = hoveredPoi === i
        return (
          <button
            key={i}
            onClick={() => onSelectPoi(poi)}
            onMouseEnter={() => setHoveredPoi(i)}
            onMouseLeave={() => setHoveredPoi(null)}
            className="absolute z-10 flex flex-col items-center cursor-pointer group"
            style={{
              left: poi.left,
              top: poi.top,
              transform: "translate(-50%, -50%)",
            }}
            aria-label={poi.name}
          >
            {/* Always-visible pulsing dot */}
            <div className="relative flex items-center justify-center">
              {/* Outer ring */}
              <div
                className="absolute rounded-full border transition-all duration-300"
                style={{
                  width: isHov ? 36 : 24,
                  height: isHov ? 36 : 24,
                  borderColor: "#c9a84c",
                  opacity: isHov ? 0.6 : 0.4,
                }}
              />
              {/* Inner dot */}
              <div
                className="rounded-full transition-all duration-200"
                style={{
                  width: isHov ? 12 : 8,
                  height: isHov ? 12 : 8,
                  background: "#c9a84c",
                  boxShadow: isHov
                    ? "0 0 10px #c9a84c"
                    : "0 0 4px rgba(201,168,76,0.5)",
                }}
              />
            </div>

            {/* Label — appears on hover */}
            <div
              className="mt-1.5 px-2.5 py-1 whitespace-nowrap transition-all duration-200 pointer-events-none"
              style={{
                background: "rgba(10,14,10,0.88)",
                border: "1px solid rgba(201,168,76,0.5)",
                backdropFilter: "blur(6px)",
                opacity: isHov ? 1 : 0,
                transform: isHov ? "translateY(0)" : "translateY(-4px)",
              }}
            >
              <span className="font-['Outfit'] text-[10px] tracking-wide text-[#c9a84c] whitespace-nowrap">
                {poi.name}
              </span>
            </div>
          </button>
        )
      })}

      {/* Bottom sector navigation */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 px-5 py-4 flex items-center justify-between gap-4"
        style={{
          background:
            "linear-gradient(to top, rgba(10,14,10,0.92) 0%, transparent 100%)",
        }}
      >
        <div className="flex gap-2 flex-wrap">
          {SECTORS.filter((s) => s.id !== sector.id).map((s) => (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className="flex items-center gap-2 px-3 py-2 border border-[#1a281a] hover:border-[#c9a84c] text-[#6a8e5a] hover:text-[#c9a84c] text-[10px] tracking-wider uppercase font-['Outfit'] transition-all duration-200 group"
              style={{
                background: "rgba(10,14,10,0.75)",
                backdropFilter: "blur(4px)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"
                style={{ background: s.statusColor }}
              />
              {s.labelGeo}
            </button>
          ))}
        </div>
        <p className="text-[#2a3a2a] text-[9px] tracking-widest uppercase font-['Outfit'] hidden sm:block">
          ნიაბის მამული
        </p>
      </div>
    </div>
  )
}

/* ─── Text sector page (fallback) ───────────────────────────────────── */

function SectorTextPage({
  sector,
  onBack,
  onNavigate,
}: {
  sector: SectorInfo
  onBack: () => void
  onNavigate: (id: SectorId) => void
}) {
  return (
    <div className="page-enter min-h-screen bg-[#0a0e0a] flex flex-col">
      <nav className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-[#1a281a]">
        <button
          onClick={onBack}
          className="flex items-center gap-2.5 text-[#6a8e5a] hover:text-[#c9a84c] transition-colors duration-200 group"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="group-hover:-translate-x-0.5 transition-transform duration-150"
          >
            <path
              d="M10 3L5 8L10 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[10px] tracking-[0.25em] uppercase font-['Outfit']">
            რუკა
          </span>
        </button>
        <span className="font-['Fraunces'] text-[#c9a84c] text-sm tracking-widest">
          ნიაბის მამული
        </span>
        <div className="flex gap-1.5 items-center">
          {SECTORS.map((s) => (
            <button
              key={s.id}
              onClick={() => s.id !== sector.id && onNavigate(s.id)}
              className="rounded-full transition-all duration-200"
              style={{
                width: s.id === sector.id ? 20 : 6,
                height: 6,
                background: s.id === sector.id ? "#c9a84c" : "#2a3a2a",
                cursor: s.id === sector.id ? "default" : "pointer",
              }}
            />
          ))}
        </div>
      </nav>

      <div className="flex-1 max-w-5xl mx-auto w-full px-6 sm:px-10 py-10 sm:py-14">
        <div className="mb-10">
          <span
            className="text-[9px] tracking-[0.4em] uppercase font-['Outfit'] px-2.5 py-1 border inline-block mb-4"
            style={{
              color: sector.statusColor,
              borderColor: sector.statusColor,
            }}
          >
            {sector.subtitleEn}
          </span>
          <h2 className="font-['Fraunces'] text-5xl sm:text-7xl text-[#f0ead8] font-light leading-none tracking-tight mb-2">
            {sector.labelGeo}
          </h2>
          <p className="font-['Fraunces'] italic text-[#6a8e5a] text-lg sm:text-xl">
            {sector.subtitleGeo}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-12">
          <div className="md:col-span-2 space-y-10">
            <div>
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#c9a84c] mb-4 font-['Outfit']">
                აღწერა
              </p>
              <p className="text-[#b8ad96] leading-relaxed text-[15px] font-['Outfit'] font-light">
                {sector.description}
              </p>
            </div>
            <div className="pt-8 border-t border-[#1a281a]">
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#c9a84c] mb-5 font-['Outfit']">
                მახასიათებლები
              </p>
              <ul className="space-y-3.5">
                {sector.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-[#8a9e7a] font-['Outfit'] text-sm"
                  >
                    <span
                      className="w-5 h-px flex-shrink-0"
                      style={{ background: sector.statusColor, opacity: 0.6 }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <div className="border border-[#1a281a] p-5">
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#3a4e2a] mb-2 font-['Outfit']">
                სექტორი
              </p>
              <p className="font-['Fraunces'] text-5xl text-[#f0ead8] font-light">
                {sector.id}
              </p>
            </div>
            {sector.units !== "—" && (
              <div className="border border-[#1a281a] p-5">
                <p className="text-[9px] tracking-[0.35em] uppercase text-[#3a4e2a] mb-2 font-['Outfit']">
                  {sector.unitsLabel}
                </p>
                <p className="font-['Fraunces'] text-5xl text-[#f0ead8] font-light">
                  {sector.units}
                </p>
              </div>
            )}
            <div className="border border-[#1a281a] p-5">
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#3a4e2a] mb-2 font-['Outfit']">
                ტიპი
              </p>
              <p className="font-['Fraunces'] text-lg text-[#f0ead8] font-light leading-snug">
                {sector.subtitleGeo}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-[#1a281a]">
          <p className="font-['Fraunces'] italic text-[#6a8e5a] text-sm max-w-sm">
            "{sector.tagline}"
          </p>
          <button
            className="px-8 py-3.5 text-[#0a0e0a] text-[10px] tracking-[0.35em] uppercase font-['Outfit'] font-semibold hover:opacity-90 transition-opacity"
            style={{ background: sector.statusColor }}
          >
            დაგვიკავშირდით
          </button>
        </div>

        <div className="mt-10 pt-8 border-t border-[#1a281a]">
          <p className="text-[9px] tracking-[0.35em] uppercase text-[#3a4e2a] mb-4 font-['Outfit']">
            სხვა სექტორები
          </p>
          <div className="flex flex-wrap gap-2">
            {SECTORS.filter((s) => s.id !== sector.id).map((s) => (
              <button
                key={s.id}
                onClick={() => onNavigate(s.id)}
                className="flex items-center gap-2 px-4 py-2.5 border border-[#1a281a] hover:border-[#c9a84c] text-[#6a8e5a] hover:text-[#c9a84c] text-[11px] tracking-wider uppercase font-['Outfit'] transition-all duration-200 group"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"
                  style={{ background: s.statusColor }}
                />
                {s.labelGeo}
              </button>
            ))}
          </div>
        </div>
      </div>

      <footer className="px-6 sm:px-10 py-4 border-t border-[#1a281a] flex items-center justify-between">
        <p className="text-[#2a3a2a] text-[9px] tracking-widest uppercase font-['Outfit']">
          ნიაბის მამული · ნიაბის მამული
        </p>
        <p className="text-[#2a3a2a] text-[9px] tracking-widest font-['Outfit']">
          © 2026
        </p>
      </footer>
    </div>
  )
}

/* ─── Landing / hero page ───────────────────────────────────────────── */

function LandingPage({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="map-overlay-enter relative w-full h-screen overflow-hidden bg-[#0a0e0a]">
      {/* Hero image */}
      <img
        src={heroImage}
        alt="ნიაბის მამული — aerial view"
        className="w-full h-full object-cover object-center"
        style={{ filter: "brightness(0.72)" }}
      />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,14,10,0.55) 0%, transparent 35%, transparent 55%, rgba(10,14,10,0.80) 100%)",
        }}
      />

      {/* Top logo bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-px h-8 bg-[#c9a84c] opacity-40" />
          <p className="text-[#c9a84c] text-[9px] tracking-[0.4em] uppercase font-['Outfit'] font-light">
            Estate Development · Georgia
          </p>
        </div>
        <p className="text-[#4a5e3a] text-[9px] tracking-[0.3em] uppercase font-['Outfit'] hidden sm:block">
          2026
        </p>
      </div>

      {/* Centre branding */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
        <p className="text-[#c9a84c] text-[10px] tracking-[0.5em] uppercase font-['Outfit'] font-light mb-4">
          ნიაბის მამული
        </p>
        <h1
          className="font-['Fraunces'] text-[#f0ead8] font-light leading-none tracking-widest mb-3"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)" }}
        >
          ნიაბის მამული
        </h1>
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-px bg-[#c9a84c] opacity-40" />
          <p className="font-['Fraunces'] italic text-[#8a9e7a] text-base sm:text-lg">
            სექტორების გეგმა
          </p>
          <div className="w-16 h-px bg-[#c9a84c] opacity-40" />
        </div>

        {/* CTA */}
        <button
          onClick={onEnter}
          className="group flex flex-col items-center gap-3 hover:gap-4 transition-all duration-300"
        >
          <span
            className="px-10 py-4 border font-['Outfit'] text-[11px] tracking-[0.4em] uppercase transition-all duration-300"
            style={{
              borderColor: "#c9a84c",
              color: "#c9a84c",
              background: "rgba(10,14,10,0.5)",
              backdropFilter: "blur(6px)",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = "#c9a84c"
              ;(e.currentTarget as HTMLElement).style.color = "#0a0e0a"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background =
                "rgba(10,14,10,0.5)"
              ;(e.currentTarget as HTMLElement).style.color = "#c9a84c"
            }}
          >
            სექტორების გამოკვლევა
          </span>
          <span className="text-[#4a5e3a] text-[9px] tracking-[0.35em] uppercase font-['Outfit'] group-hover:text-[#6a8e5a] transition-colors">
            Explore Sectors
          </span>
        </button>
      </div>

      {/* Bottom info strip */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 px-8 py-5 flex items-end justify-between"
        style={{
          background:
            "linear-gradient(to top, rgba(10,14,10,0.85) 0%, transparent 100%)",
        }}
      >
        <div className="flex gap-6">
          {[
            { num: "3", label: "სექტორი" },
            { num: "52+", label: "ნაკვეთი" },
            { num: "∞", label: "ბუნება" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-['Fraunces'] text-[#f0ead8] text-xl font-light leading-none">
                {stat.num}
              </p>
              <p className="text-[#4a5e3a] text-[9px] tracking-widest uppercase font-['Outfit'] mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <p className="text-[#2a3a2a] text-[9px] tracking-widest uppercase font-['Outfit'] hidden sm:block">
          ნიაბის მამული · ნიაბის მამული
        </p>
      </div>
    </div>
  )
}

/* ─── Main map ──────────────────────────────────────────────────────── */

function MapPage({
  onSelectSector,
  onBack,
}: {
  onSelectSector: (id: SectorId) => void
  onBack: () => void
}) {
  const [hoveredSector, setHoveredSector] = useState<SectorId | null>(null)

  return (
    <div className="map-overlay-enter relative w-full h-screen overflow-hidden bg-[#0a0e0a]">
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,14,10,0.95) 0%, transparent 100%)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-px h-9 bg-[#c9a84c] opacity-50" />
          <div>
            <p className="text-[#c9a84c] text-[9px] tracking-[0.35em] uppercase font-['Outfit'] font-light mb-0.5">
              ნიაბის მამული · Estate Development
            </p>
            <h1 className="font-['Fraunces'] text-[#f0ead8] text-xl font-semibold leading-none tracking-wide">
              ნიაბის მამული
            </h1>
          </div>
        </div>
        <button
          onClick={onBack}
          className="text-[#4a5e3a] hover:text-[#c9a84c] text-[9px] tracking-[0.3em] uppercase font-['Outfit'] transition-colors duration-200 hidden sm:block"
        >
          ← მთავარი
        </button>
      </div>

      <img
        src={mapImage}
        alt="ნიაბის მამულის სექტორების გეგმა"
        className="w-full h-full object-cover object-center transition-all duration-700"
        style={{
          filter: hoveredSector
            ? "brightness(0.6) saturate(0.8)"
            : "brightness(0.82)",
        }}
      />

      {SECTORS.map((sector) => {
        const isHovered = hoveredSector === sector.id
        return (
          <button
            key={sector.id}
            onClick={() => onSelectSector(sector.id)}
            onMouseEnter={() => setHoveredSector(sector.id)}
            onMouseLeave={() => setHoveredSector(null)}
            className="absolute flex flex-col items-center cursor-pointer"
            style={{
              left: sector.left,
              top: sector.top,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative flex items-center justify-center">
              <div
                className="absolute rounded-full border transition-all duration-300"
                style={{
                  width: isHovered ? 40 : 28,
                  height: isHovered ? 40 : 28,
                  borderColor: sector.statusColor,
                  opacity: isHovered ? 0.5 : 0.35,
                }}
              />
              <div
                className={`rounded-full transition-all duration-200 ${
                  isHovered ? "" : "sector-pulse"
                }`}
                style={{
                  width: isHovered ? 14 : 10,
                  height: isHovered ? 14 : 10,
                  background: sector.statusColor,
                  boxShadow: isHovered
                    ? `0 0 12px ${sector.statusColor}`
                    : "none",
                }}
              />
            </div>
            <div
              className="mt-2 px-3 py-1.5 transition-all duration-200 whitespace-nowrap border"
              style={{
                background: isHovered
                  ? sector.statusColor
                  : "rgba(10,14,10,0.85)",
                borderColor: sector.statusColor,
                backdropFilter: "blur(8px)",
                color: isHovered ? "#0a0e0a" : sector.statusColor,
              }}
            >
              <span className="font-['Fraunces'] text-[13px] font-semibold tracking-wider">
                {sector.labelGeo}
              </span>
              {isHovered && (
                <div className="text-[9px] font-['Outfit'] tracking-widest uppercase mt-0.5 opacity-80">
                  {sector.subtitleEn}
                </div>
              )}
            </div>
          </button>
        )
      })}

      <div
        className="absolute bottom-0 left-0 right-0 z-20 px-6 py-4 flex items-end justify-between gap-4"
        style={{
          background:
            "linear-gradient(to top, rgba(10,14,10,0.92) 0%, transparent 100%)",
        }}
      >
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {SECTORS.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectSector(s.id)}
              className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-200 group"
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: s.statusColor }}
              />
              <span className="text-[#d4c9a8] text-[10px] tracking-wider font-['Outfit'] group-hover:text-[#c9a84c] transition-colors">
                {s.labelGeo}
              </span>
              <span className="text-[#4a5e3a] text-[9px] font-['Outfit'] hidden sm:inline">
                · {s.subtitleEn}
              </span>
            </button>
          ))}
        </div>
        <p className="text-[#3a4e2a] text-[9px] tracking-widest uppercase font-['Outfit'] whitespace-nowrap hidden md:block">
          Click sector to explore
        </p>
      </div>
    </div>
  )
}

/* ─── App root ──────────────────────────────────────────────────────── */

export default function App() {
  const [page, setPage] = useState<Page>("landing")
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null)

  const activeSector =
    page !== "landing" && page !== "map"
      ? (SECTORS.find((s) => s.id === page) ?? null)
      : null

  if (selectedPoi && activeSector) {
    return (
      <PoiDetailPage
        poi={selectedPoi}
        sector={activeSector}
        onBack={() => setSelectedPoi(null)}
      />
    )
  }

  return (
    <>
      {page === "landing" && <LandingPage onEnter={() => setPage("map")} />}
      {page === "map" && (
        <MapPage
          onSelectSector={(id) => setPage(id)}
          onBack={() => setPage("landing")}
        />
      )}
      {activeSector && activeSector.detailImage && (
        <SectorMapPage
          sector={activeSector}
          onBack={() => setPage("map")}
          onNavigate={(id) => {
            setSelectedPoi(null)
            setPage(id)
          }}
          onSelectPoi={(poi) => setSelectedPoi(poi)}
        />
      )}
      {activeSector && !activeSector.detailImage && (
        <SectorTextPage
          sector={activeSector}
          onBack={() => setPage("map")}
          onNavigate={(id) => setPage(id)}
        />
      )}
    </>
  )
}
