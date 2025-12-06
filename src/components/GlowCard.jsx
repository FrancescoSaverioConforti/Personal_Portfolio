import { useRef } from "react";

const GlowCard = ({ card, index, children }) => {
  const cardRefs = useRef([]);

  const handleMouseMove = (index) => (e) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;

    card.style.setProperty("--start", angle + 60);
  };

  return (
    <div
      ref={(el) => (cardRefs.current[index] = el)}
      onMouseMove={handleMouseMove(index)}
      className="card card-border rounded-xl p-10 mb-5 break-inside-avoid-column relative overflow-hidden group"
    >
      {/* Glow background */}
      <div className="glow"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-10 pointer-events-none" />

      {/* Holographic Border */}
      <div className="absolute inset-0 rounded-xl border border-white/10 group-hover:border-cyan-primary/50 transition-colors duration-500" />

      {/* REMOVE STARS — CLEAN TOP AREA */}
      {/* Nothing here anymore */}

      {/* REVIEW (if used externally) */}
      {card?.review && (
        <div className="mb-5 relative z-10">
          <p className="text-white-50 text-lg">{card.review}</p>
        </div>
      )}

      {/* INNER CONTENT FROM PARENT */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlowCard;
