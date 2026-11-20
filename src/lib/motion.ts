/**
 * Shared motion constants for the "Deep Forest & Terracotta Editorial" design system.
 * Import from here — never scatter magic numbers.
 */

/** Primary editorial easing — smooth deceleration */
export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

/** Soft spring for interactive elements */
export const SPRING_SOFT = { type: "spring", stiffness: 260, damping: 28 } as const;

/** Durations in seconds */
export const DUR = {
  xshort: 0.15,
  short: 0.25,
  base: 0.5,
  long: 0.6,
  xlong: 0.8,
} as const;

/** Stagger delay between children */
export const STAGGER = 0.08 as const;

/** Common reveal variants (fade-up) */
export const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.long, ease: EASE_EDITORIAL },
  },
} as const;

/** Stagger container variants */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: STAGGER, delayChildren: 0.05 },
  },
} as const;

/** Individual stagger item variants */
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_EDITORIAL },
  },
} as const;

/** Viewport settings for scroll-triggered animations */
export const VIEWPORT = { once: true, margin: "-80px" } as const;

/** Fade-in only (no Y shift) for elements that must not shift layout */
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DUR.base, ease: EASE_EDITORIAL },
  },
} as const;

/** Slide-up for modals / drawers on mobile */
export const slideUpVariants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.short, ease: EASE_EDITORIAL },
  },
  exit: {
    opacity: 0,
    y: "100%",
    transition: { duration: DUR.xshort, ease: EASE_EDITORIAL },
  },
} as const;

/** Scale-in for desktop modals */
export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.short, ease: EASE_EDITORIAL },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: DUR.xshort, ease: EASE_EDITORIAL },
  },
} as const;

/** Backdrop fade */
export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.short } },
  exit: { opacity: 0, transition: { duration: DUR.xshort } },
} as const;
