import React from "react";
import { useScrollPosition } from "../hooks/useScrollPosition";

export default function ScrollProgressBar() {
  const { scrollProgress } = useScrollPosition();

  return (
    <div className="fixed top-0 left-0 w-full h-[4px] z-50 bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-brand-blue via-brand-gold to-brand-green transition-all duration-150 ease-out shadow-sm"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  );
}
