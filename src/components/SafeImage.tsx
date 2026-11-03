"use client";

import React, { useState } from "react";
import Image, { type ImageProps } from "next/image";

const PLACEHOLDER = "/images/placeholder.svg";

export default function SafeImage({ src, alt, ...rest }: ImageProps) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      {...rest}
      src={failed ? PLACEHOLDER : src}
      alt={alt}
      unoptimized={failed ? true : rest.unoptimized}
      onError={() => setFailed(true)}
    />
  );
}
