"use client";

import dynamic from "next/dynamic";
import ScrollProgress from "./ScrollProgress";

// CursorFollower is desktop-only, lazy load it
const CursorFollower = dynamic(() => import("./CursorFollower"), { ssr: false });

export default function GlobalAnimations() {
  return (
    <>
      <ScrollProgress />
      <CursorFollower />
    </>
  );
}
