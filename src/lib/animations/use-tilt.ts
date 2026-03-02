"use client";

import { useRef, useCallback } from "react";

export function useTilt3D(maxTilt: number = 10) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      ref.current.style.transform = `perspective(800px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale3d(1.03, 1.03, 1.03)`;
    },
    [maxTilt]
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transition = "transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)";
    ref.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = "";
    }, 600);
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
