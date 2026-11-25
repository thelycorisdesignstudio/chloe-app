import type { SceneName } from "@/components/illustrations";

/**
 * Every post has its own banner: a unique illustration (no scene is used twice)
 * on a brand-colour background. Palette indexes refer to BlogBanner's palettes.
 */
export const bannerSpecs: Record<string, { scene: SceneName; palette: number }> = {
  "best-free-things-to-do-with-kids-in-dubai": { scene: "skyline", palette: 0 },
  "abu-dhabi-with-kids-family-weekend": { scene: "abudhabi", palette: 1 },
  "summer-in-the-uae-with-kids-stay-cool": { scene: "sun", palette: 2 },
  "best-indoor-play-areas-dubai-hot-days": { scene: "playground", palette: 3 },
  "yas-island-family-guide-theme-parks": { scene: "coaster", palette: 1 },
  "ramadan-family-activities-uae": { scene: "lantern", palette: 5 },
  "sheikh-zayed-grand-mosque-with-kids": { scene: "mosque", palette: 2 },
  "winter-in-the-uae-best-outdoor-family-season": { scene: "tent", palette: 5 },
  "family-friendly-beaches-in-dubai": { scene: "beach", palette: 1 },
  "sharjah-with-kids-museums-parks-waterfronts": { scene: "fountain", palette: 3 },
  "educational-outings-for-kids-museums-science-centres-gcc": { scene: "telescope", palette: 5 },
  "water-parks-in-dubai-parents-guide": { scene: "waterslide", palette: 3 },
  "al-ain-with-kids-zoo-oasis-jebel-hafeet": { scene: "palm", palette: 0 },
  "day-out-packing-checklist-families-gulf-heat": { scene: "backpack", palette: 2 },
  "best-parks-and-playgrounds-in-dubai": { scene: "swing", palette: 0 },
  "ras-al-khaimah-jebel-jais-with-kids": { scene: "zipline", palette: 1 },
  "things-to-do-in-doha-with-kids": { scene: "pearl", palette: 3 },
  "things-to-do-with-toddlers-in-dubai": { scene: "blocks", palette: 2 },
  "fujairah-khor-fakkan-family-day-trips": { scene: "mountains", palette: 3 },
  "family-activities-in-riyadh-and-jeddah": { scene: "tower", palette: 1 },
  "rainy-day-activities-for-kids-in-dubai": { scene: "umbrella", palette: 0 },
  "ajman-umm-al-quwain-hidden-family-gems": { scene: "dhow", palette: 2 },
  "kuwait-city-with-kids-parks-science-play": { scene: "kuwait", palette: 3 },
  "best-cinemas-for-kids-in-dubai-vox-reel": { scene: "popcorn", palette: 5 },
  "free-things-to-do-with-kids-abu-dhabi": { scene: "kite", palette: 0 },
  "muscat-and-manama-with-kids-oman-bahrain-family-guide": { scene: "fort", palette: 1 },
  "dubai-miracle-garden-and-dubai-frame-with-kids": { scene: "flowers", palette: 5 },
  "best-family-beaches-in-abu-dhabi": { scene: "shell", palette: 2 },
  "choose-age-appropriate-activities-for-kids-0-12": { scene: "stroller", palette: 4 },
  "kids-birthday-party-venue-ideas-in-dubai": { scene: "balloons", palette: 3 },
};
