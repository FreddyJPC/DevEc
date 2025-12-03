import { useEffect, useState, useRef } from "react";

export default function CursorSpotlight() {
  const [isMobile, setIsMobile] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };
    setIsMobile(checkMobile());
  }, []);

  useEffect(() => {
    if (isMobile || !divRef.current) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      if (divRef.current) {
        divRef.current.style.background = `
          radial-gradient(
            250px circle at ${clientX}px ${clientY}px, 
            rgba(30, 179, 139, 0.6), 
            transparent 100%
          )
        `;
        // Color cambiado a #00b584 y opacidad aumentada a 0.6, el gradiente llega hasta 50% para más intensidad
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={divRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        mixBlendMode: 'screen',
        transition: 'background 0.1s ease'
      }}
    />
  );
}
