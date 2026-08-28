"use client";

import { useState, useEffect, useCallback } from "react";
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from "@/lib/gallery-images";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface ImageGalleryProps {
  limit?: number;
  showFilters?: boolean;
  enableLightbox?: boolean;
  className?: string;
  categoryFilter?: "tatuaje" | "pintura" | "aerografia";
}

export function ImageGallery({
  limit,
  showFilters = true,
  enableLightbox = true,
  className = "",
  categoryFilter,
}: ImageGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>(
    categoryFilter || "todas"
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    activeCategory === "todas"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const imagesToShow = limit ? filteredImages.slice(0, limit) : filteredImages;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? prev : (prev + 1) % imagesToShow.length
    );
  }, [imagesToShow.length]);
  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null
        ? prev
        : (prev - 1 + imagesToShow.length) % imagesToShow.length
    );
  }, [imagesToShow.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  return (
    <>
      {showFilters && !categoryFilter && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeCategory === cat.value
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <div
        className={`grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 ${className}`}
      >
        {imagesToShow.map((img, index) => (
          <button
            key={img.src}
            onClick={() => enableLightbox && setLightboxIndex(index)}
            className={`group relative aspect-square overflow-hidden rounded-xl bg-muted shadow-sm transition-all duration-300 hover:shadow-lg ${
              enableLightbox ? "cursor-pointer hover:-translate-y-1" : ""
            }`}
            aria-label={`Ver imagen: ${img.alt}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {enableLightbox && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                <ZoomIn className="size-8 text-white drop-shadow-lg" />
              </div>
            )}
          </button>
        ))}
      </div>

      {imagesToShow.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          No hay imágenes en esta categoría todavía.
        </p>
      )}

      {lightboxIndex !== null && imagesToShow[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Cerrar"
          >
            <X className="size-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            aria-label="Anterior"
          >
            <ChevronLeft className="size-6" />
          </button>
          <div
            className="max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imagesToShow[lightboxIndex].src}
              alt={imagesToShow[lightboxIndex].alt}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
            />
            <p className="mt-3 text-center text-sm text-white/80">
              {imagesToShow[lightboxIndex].alt}
              <span className="ml-2 text-white/50">
                ({lightboxIndex + 1} / {imagesToShow.length})
              </span>
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            aria-label="Siguiente"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </>
  );
}
