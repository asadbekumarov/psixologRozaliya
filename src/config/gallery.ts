export interface GalleryItem {
  id: string;
  src: string;
  altKey: string;
  aspect: "4/5" | "1/1" | "3/4";
  w: number;
  h: number;
}

export const galleryItems: GalleryItem[] = [
  { id: "g26", src: "/images/gallery/gallery-26.webp", altKey: "altDefault", aspect: "1/1", w: 1080, h: 1080 },
  { id: "g09", src: "/images/gallery/gallery-09.webp", altKey: "altDefault", aspect: "4/5", w: 1080, h: 1080 },
  { id: "g17", src: "/images/gallery/gallery-17.webp", altKey: "altDefault", aspect: "3/4", w: 1080, h: 1080 },
  { id: "g01", src: "/images/gallery/gallery-01.webp", altKey: "altDefault", aspect: "4/5", w: 1080, h: 1080 },
  { id: "g12", src: "/images/gallery/gallery-12.webp", altKey: "altDefault", aspect: "1/1", w: 1080, h: 1080 },
  { id: "g03", src: "/images/gallery/gallery-03.webp", altKey: "altDefault", aspect: "3/4", w: 1080, h: 1080 },
  { id: "g20", src: "/images/gallery/gallery-20.webp", altKey: "altDefault", aspect: "4/5", w: 1080, h: 1080 },
  { id: "g10", src: "/images/gallery/gallery-10.webp", altKey: "altDefault", aspect: "1/1", w: 1080, h: 1080 },
  { id: "g07", src: "/images/gallery/gallery-07.webp", altKey: "altDefault", aspect: "3/4", w: 1080, h: 1080 },
  { id: "g18", src: "/images/gallery/gallery-18.webp", altKey: "altDefault", aspect: "1/1", w: 1080, h: 1080 },
  { id: "g05", src: "/images/gallery/gallery-05.webp", altKey: "altDefault", aspect: "4/5", w: 1080, h: 1080 },
  { id: "g24", src: "/images/gallery/gallery-24.webp", altKey: "altDefault", aspect: "1/1", w: 1080, h: 1080 },

  { id: "g11", src: "/images/gallery/gallery-11.webp", altKey: "altDefault", aspect: "1/1", w: 1080, h: 1080 },
  { id: "g08", src: "/images/gallery/gallery-08.webp", altKey: "altDefault", aspect: "4/5", w: 1080, h: 1080 },
  { id: "g15", src: "/images/gallery/gallery-15.webp", altKey: "altDefault", aspect: "3/4", w: 1080, h: 1080 },
  { id: "g23", src: "/images/gallery/gallery-23.webp", altKey: "altDefault", aspect: "1/1", w: 1080, h: 1080 },
  { id: "g02", src: "/images/gallery/gallery-02.webp", altKey: "altDefault", aspect: "4/5", w: 1080, h: 1080 },
  { id: "g19", src: "/images/gallery/gallery-19.webp", altKey: "altDefault", aspect: "3/4", w: 1080, h: 1080 },
  { id: "g04", src: "/images/gallery/gallery-04.webp", altKey: "altDefault", aspect: "1/1", w: 1080, h: 1080 },
  { id: "g06", src: "/images/gallery/gallery-06.webp", altKey: "altDefault", aspect: "3/4", w: 1080, h: 1080 },
  { id: "g26b", src: "/images/gallery/gallery-26.webp", altKey: "altDefault", aspect: "1/1", w: 1080, h: 1080 },
  { id: "g10b", src: "/images/gallery/gallery-10.webp", altKey: "altDefault", aspect: "4/5", w: 1080, h: 1080 },
  { id: "g12b", src: "/images/gallery/gallery-12.webp", altKey: "altDefault", aspect: "1/1", w: 1080, h: 1080 },
  { id: "g01b", src: "/images/gallery/gallery-01.webp", altKey: "altDefault", aspect: "4/5", w: 1080, h: 1080 },
];

export const galleryRow1 = galleryItems.slice(0, 12);
export const galleryRow2 = galleryItems.slice(12);
