"use client";

import { useRef, useCallback } from "react";

export function useMagnetic(strength: number = 0.3) {
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transition = "transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)";
    ref.current.style.transform = "translate(0px, 0px)";
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = "";
    }, 500);
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
