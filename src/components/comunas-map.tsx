"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MapPin, ChevronDown, Search } from "lucide-react";
import { COMUNAS } from "@/lib/business-data";

export function ComunasMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const [search, setSearch] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!mapRef.current) return;
    if (leafletMapRef.current) return;

    // Inyectar CSS de Leaflet
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const loadLeaflet = async () => {
      try {
        if (!(window as any).L) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Leaflet load failed"));
            document.head.appendChild(script);
          });
        }
        const L = (window as any).L;
        if (!L) return;

        const map = L.map(mapRef.current!, {
          center: [-33.45, -70.65],
          zoom: 10,
          scrollWheelZoom: false,
          zoomControl: true,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap",
          maxZoom: 18,
        }).addTo(map);

        COMUNAS.forEach((comuna) => {
          if (!comuna.coords) return;
          const icon = L.divIcon({
            className: "custom-marker",
            html: `<div style="width:14px;height:14px;background:#22c55e;border:2px solid #fff;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.4);cursor:pointer;"></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7],
          });
          L.marker([comuna.coords.lat, comuna.coords.lng], { icon })
            .addTo(map)
            .bindPopup(
              `<div style="font-family: inherit; min-width: 150px;">
                <strong style="color:#22c55e;font-size:1rem;">${comuna.name}</strong>
                <p style="margin:4px 0;font-size:0.85rem;color:#4b5563;">Tatuajes y aerografía disponibles</p>
                <a href="/comunas/${comuna.slug}" style="color:#22c55e;font-weight:600;text-decoration:none;font-size:0.9rem;">Ver servicios en ${comuna.name} &rarr;</a>
              </div>`
            );
        });

        leafletMapRef.current = map;
      } catch (err) {
        console.error("Error loading Leaflet:", err);
      }
    };

    loadLeaflet();

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  const filteredComunas = search
    ? COMUNAS.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    : COMUNAS;

  return (
    <section id="comunas" className="py-20 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <MapPin className="size-4" />
            Áreas de Servicio
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Comunas de Santiago que Atendemos
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Cubrimos toda la Región Metropolitana de Santiago de Chile con
            tatuajes en estudio y aerografía a domicilio. Haz clic en cualquier
            comuna del mapa o de la lista para ver los servicios disponibles.
          </p>
        </div>

        <div className="mb-8 overflow-hidden rounded-2xl border-2 border-border shadow-lg">
          <div
            ref={mapRef}
            style={{ height: 450, width: "100%" }}
            aria-label="Mapa interactivo de comunas de Santiago donde Samsara Tattoo Studio ofrece servicios"
          />
        </div>

        <div className="mx-auto mb-6 max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar comuna (ej: Las Condes, Providencia...)"
              className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-5 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="mx-auto max-w-5xl">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mx-auto mb-6 flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90"
          >
            {isExpanded ? "Ocultar" : "Ver"} lista de {COMUNAS.length} comunas
            <ChevronDown
              className={`size-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>

          {isExpanded && (
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredComunas.map((comuna) => (
                  <Link
                    key={comuna.slug}
                    href={`/comunas/${comuna.slug}`}
                    className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    <MapPin className="size-3.5 flex-shrink-0 text-primary" />
                    {comuna.name}
                  </Link>
                ))}
              </div>
              {filteredComunas.length === 0 && (
                <p className="py-6 text-center text-muted-foreground">
                  No se encontraron comunas con ese nombre.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
