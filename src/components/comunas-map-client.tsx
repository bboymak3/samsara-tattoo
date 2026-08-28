"use client";

import dynamic from "next/dynamic";

const ComunasMap = dynamic(
  () => import("@/components/comunas-map").then((m) => m.ComunasMap),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ height: 450 }}
        className="flex items-center justify-center rounded-2xl border-2 border-border bg-muted/30"
      >
        <span className="text-muted-foreground">Cargando mapa...</span>
      </div>
    ),
  }
);

export function ComunasMapClient() {
  return <ComunasMap />;
}
