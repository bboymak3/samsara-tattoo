"use client";

import { useEffect, useState } from "react";

interface OwlEyesProps {
  /** Tamaño del buho en px */
  size?: number;
  className?: string;
}

/**
 * Búho decorativo con ojos animados.
 * Efecto: los ojos tienen un brillo tipo fuego que pulsa suavemente,
 * y las pupilas se mueven aleatoriamente creando ilusión de movimiento.
 */
export function OwlEyes({ size = 120, className = "" }: OwlEyesProps) {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  // Mover las pupilas aleatoriamente cada 2-3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 6;
      setPupilOffset({ x, y });
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const eyeSize = size * 0.22;
  const pupilSize = eyeSize * 0.55;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size * 0.85 }}
      aria-hidden="true"
    >
      {/* Estilos de animación inline para evitar conflictos con Tailwind */}
      <style>{`
        @keyframes owlGlow {
          0%, 100% {
            box-shadow: 0 0 8px 2px rgba(34, 197, 94, 0.4),
                        0 0 16px 4px rgba(34, 197, 94, 0.2),
                        inset 0 0 6px 1px rgba(16, 185, 129, 0.6);
          }
          50% {
            box-shadow: 0 0 14px 4px rgba(34, 197, 94, 0.7),
                        0 0 28px 8px rgba(34, 197, 94, 0.4),
                        inset 0 0 10px 2px rgba(16, 185, 129, 0.9);
          }
        }
        @keyframes fireFlicker {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          25% { opacity: 1; transform: scale(1.05); }
          50% { opacity: 0.7; transform: scale(0.95); }
          75% { opacity: 0.95; transform: scale(1.02); }
        }
        @keyframes pupilMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(var(--tx), var(--ty)); }
        }
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          93%, 97% { transform: scaleY(0.1); }
        }
        .owl-eye {
          animation: owlGlow 3s ease-in-out infinite, blink 5s infinite;
        }
        .owl-eye:nth-child(2) {
          animation-delay: 0.15s, 5s;
        }
        .owl-pupil {
          transition: transform 1.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .owl-fire {
          animation: fireFlicker 0.6s ease-in-out infinite;
          mix-blend-mode: screen;
        }
      `}</style>

      {/* Cuerpo del búho (simple, oscuro) */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, #18181b 0%, #09090b 70%)",
          borderRadius: "50% 50% 45% 45%",
          border: "2px solid #27272a",
        }}
      />

      {/* Cejas / plumas superiores */}
      <div
        className="absolute"
        style={{
          top: size * 0.08,
          left: size * 0.18,
          width: size * 0.25,
          height: size * 0.08,
          background: "linear-gradient(135deg, #27272a, #3f3f46)",
          borderRadius: "50% 50% 0 50%",
          transform: "rotate(-25deg)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: size * 0.08,
          right: size * 0.18,
          width: size * 0.25,
          height: size * 0.08,
          background: "linear-gradient(225deg, #27272a, #3f3f46)",
          borderRadius: "50% 50% 50% 0",
          transform: "rotate(25deg)",
        }}
      />

      {/* Ojo izquierdo */}
      <div
        className="owl-eye absolute"
        style={{
          top: size * 0.22,
          left: size * 0.2,
          width: eyeSize,
          height: eyeSize,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 35%, #fef3c7 0%, #fbbf24 25%, #f59e0b 50%, #d97706 75%, #92400e 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Brillo tipo fuego */}
        <div
          className="owl-fire absolute"
          style={{
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 60%, rgba(251, 191, 36, 0.8) 0%, transparent 60%)",
          }}
        />
        {/* Pupila */}
        <div
          className="owl-pupil relative"
          style={
            {
              width: pupilSize,
              height: pupilSize,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 40% 40%, #1a1a1a 0%, #000 80%)",
              transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
              "--tx": `${pupilOffset.x}px`,
              "--ty": `${pupilOffset.y}px`,
            } as React.CSSProperties
          }
        >
          {/* Reflejo en la pupila */}
          <div
            className="absolute"
            style={{
              top: "20%",
              left: "20%",
              width: "30%",
              height: "30%",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.6)",
            }}
          />
        </div>
      </div>

      {/* Ojo derecho */}
      <div
        className="owl-eye absolute"
        style={{
          top: size * 0.22,
          right: size * 0.2,
          width: eyeSize,
          height: eyeSize,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 35%, #fef3c7 0%, #fbbf24 25%, #f59e0b 50%, #d97706 75%, #92400e 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          className="owl-fire absolute"
          style={{
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 60%, rgba(251, 191, 36, 0.8) 0%, transparent 60%)",
          }}
        />
        <div
          className="owl-pupil relative"
          style={
            {
              width: pupilSize,
              height: pupilSize,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 40% 40%, #1a1a1a 0%, #000 80%)",
              transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
              "--tx": `${pupilOffset.x}px`,
              "--ty": `${pupilOffset.y}px`,
            } as React.CSSProperties
          }
        >
          <div
            className="absolute"
            style={{
              top: "20%",
              left: "20%",
              width: "30%",
              height: "30%",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.6)",
            }}
          />
        </div>
      </div>

      {/* Pico */}
      <div
        className="absolute"
        style={{
          bottom: size * 0.2,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: `${size * 0.05}px solid transparent`,
          borderRight: `${size * 0.05}px solid transparent`,
          borderTop: `${size * 0.08}px solid #f59e0b`,
        }}
      />
    </div>
  );
}
