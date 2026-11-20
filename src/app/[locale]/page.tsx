import React from "react";
import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { Hero } from "@/components/sections/Hero";
import { MarqueeTicker } from "@/components/sections/MarqueeTicker";
import { Services } from "@/components/sections/Services";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

import {
  StagesSkeleton,
  ExpertSkeleton,
  MediaArchiveSkeleton,
  BookCtaSkeleton,
  FAQSkeleton,
  ContactSkeleton,
} from "@/components/ui/skeletons";

// Dynamic imports for heavy below-fold sections with bespoke luxury skeletons to prevent CLS
const Stages = dynamic(
  () => import("@/components/sections/Stages").then((m) => m.Stages),
  { loading: () => <StagesSkeleton /> }
);
const Expert = dynamic(
  () => import("@/components/sections/Expert").then((m) => m.Expert),
  { loading: () => <ExpertSkeleton /> }
);
const Gallery = dynamic(
  () => import("@/components/sections/Gallery").then((m) => m.Gallery)
);
const MediaArchive = dynamic(
  () => import("@/components/sections/MediaArchive").then((m) => m.MediaArchive),
  { loading: () => <MediaArchiveSkeleton /> }
);
const BookCtaSplit = dynamic(
  () => import("@/components/sections/BookCtaSplit").then((m) => m.BookCtaSplit),
  { loading: () => <BookCtaSkeleton /> }
);
const FAQ = dynamic(
  () => import("@/components/sections/FAQ").then((m) => m.FAQ),
  { loading: () => <FAQSkeleton /> }
);
const Contact = dynamic(
  () => import("@/components/sections/Contact").then((m) => m.Contact),
  { loading: () => <ContactSkeleton /> }
);

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex flex-col bg-sand text-ink selection:bg-forest selection:text-ivory overflow-x-clip">
      <Navbar />

      <main className="flex-1">
        {/* Section 01: Hero (Atmospheric Deep Forest Editorial) */}
        <Hero />

        {/* Section 01.5: Marquee Smooth Ticker */}
        <MarqueeTicker />

        {/* Section 02: Services (Asymmetric Bento Grid) */}
        <Services />

        {/* Section 03: Stages Methodology Blueprint */}
        <Stages />

        {/* Section 04: Founder Monograph / Expert */}
        <Expert />

        {/* Section 04.5: Live Moments Marquee Photo Gallery */}
        <RevealOnScroll>
          <Gallery />
        </RevealOnScroll>

        {/* Section 05: Testimonials & Video Insights */}
        <MediaArchive />

        {/* Section 06: Book & Strategic Diagnostic Split-Screen */}
        <RevealOnScroll>
          <BookCtaSplit />
        </RevealOnScroll>

        {/* Section 07: High-Impact FAQ & Express Test Banner */}
        <FAQ />

        {/* Section 08: Executive Contact Channels & Quick Consultation Form */}
        <RevealOnScroll>
          <Contact />
        </RevealOnScroll>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
