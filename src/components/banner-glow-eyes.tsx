"use client";

import { BUSINESS } from "@/lib/business-data";

interface BannerWithGlowEyesProps {
  className?: string;
  /** Posición X del centro de los ojos del buho en % (0-100). Default: 50 (centro) */
  eyeCenterX?: number;
  /** Posición Y del centro de los ojos del buho en % (0-100). Default: 50 (centro vertical) */
  eyeCenterY?: number;
  /** Radio del efecto glow en % del ancho. Default: 12 */
  glowRadius?: number;
  /** Altura del banner. Default: auto */
  height?: number | string;
}

/**
 * Banner del estudio con efecto fuego en los ojos del buho.
 * El efecto combina:
 * 1. Glow dorado pulsante (animacion owlGlow)
 * 2. Flicker de fuego (animacion fireFlicker)
 * 3. Particulas de chispas que suben (animacion sparks)
 * 4. Reflejo sutil en los ojos (estatico)
 *
 * El efecto se aplica sobre la zona de los ojos del buho en la imagen real.
 */
export function BannerWithGlowEyes({
  className = "",
  eyeCenterX = 50,
  eyeCenterY = 50,
  glowRadius = 14,
  height = "auto",
}: BannerWithGlowEyesProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border shadow-xl ${className}`}
      style={{ height }}
    >
      <style>{`
        @keyframes owlGlowPulse {
          0%, 100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
            filter: blur(8px);
          }
          50% {
            opacity: 0.95;
            transform: translate(-50%, -50%) scale(1.15);
            filter: blur(12px);
          }
        }
        @keyframes fireFlickerGlow {
          0%, 100% { opacity: 0.85; }
          20% { opacity: 1; }
          40% { opacity: 0.7; }
          60% { opacity: 0.95; }
          80% { opacity: 0.8; }
        }
        @keyframes sparkRise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-40px) scale(0.3);
            opacity: 0;
          }
        }
        @keyframes eyeShimmer {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .owl-eye-glow {
          position: absolute;
          left: ${eyeCenterX}%;
          top: ${eyeCenterY}%;
          width: ${glowRadius * 2}%;
          aspect-ratio: 2 / 1;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            ellipse at center,
            rgba(251, 191, 36, 0.9) 0%,
            rgba(245, 158, 11, 0.6) 30%,
            rgba(217, 119, 6, 0.3) 60%,
            transparent 80%
          );
          pointer-events: none;
          mix-blend-mode: screen;
          animation: owlGlowPulse 2.5s ease-in-out infinite,
                     fireFlickerGlow 0.4s ease-in-out infinite;
          border-radius: 50%;
        }
        .owl-eye-shimmer {
          position: absolute;
          left: ${eyeCenterX}%;
          top: ${eyeCenterY}%;
          width: ${glowRadius}%;
          aspect-ratio: 2 / 1;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            ellipse at center,
            rgba(255, 255, 200, 0.8) 0%,
            transparent 60%
          );
          pointer-events: none;
          mix-blend-mode: screen;
          animation: eyeShimmer 3s ease-in-out infinite;
          border-radius: 50%;
        }
        .owl-spark {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #fbbf24;
          border-radius: 50%;
          pointer-events: none;
          box-shadow: 0 0 4px 1px rgba(251, 191, 36, 0.8);
          animation: sparkRise 2s ease-out infinite;
        }
      `}</style>

      {/* Imagen real del banner */}
      <img
        src={BUSINESS.bannerUrl}
        alt="Samsara Tattoo Studio - Wilfren Jiménez - Tatuaje de buho con ojos dorados en Santiago de Chile"
        className="w-full"
        loading="lazy"
      />

      {/* Overlay de glow dorado en los ojos del buho */}
      <div className="owl-eye-glow" />

      {/* Reflejo blanco sutil */}
      <div className="owl-eye-shimmer" />

      {/* Chispas que suben desde los ojos */}
      <div
        className="owl-spark"
        style={{
          left: `${eyeCenterX - 2}%`,
          top: `${eyeCenterY}%`,
          animationDelay: "0s",
        }}
      />
      <div
        className="owl-spark"
        style={{
          left: `${eyeCenterX + 1}%`,
          top: `${eyeCenterY - 1}%`,
          animationDelay: "0.5s",
        }}
      />
      <div
        className="owl-spark"
        style={{
          left: `${eyeCenterX - 1}%`,
          top: `${eyeCenterY + 1}%`,
          animationDelay: "1s",
        }}
      />
      <div
        className="owl-spark"
        style={{
          left: `${eyeCenterX + 2}%`,
          top: `${eyeCenterY}%`,
          animationDelay: "1.5s",
        }}
      />
      <div
        className="owl-spark"
        style={{
          left: `${eyeCenterX}%`,
          top: `${eyeCenterY - 2}%`,
          animationDelay: "0.3s",
        }}
      />
      <div
        className="owl-spark"
        style={{
          left: `${eyeCenterX - 3}%`,
          top: `${eyeCenterY}%`,
          animationDelay: "0.8s",
        }}
      />
      <div
        className="owl-spark"
        style={{
          left: `${eyeCenterX + 3}%`,
          top: `${eyeCenterY + 2}%`,
          animationDelay: "1.3s",
        }}
      />
    </div>
  );
}
