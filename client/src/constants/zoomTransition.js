// Zoom timeline fractions — keep in sync with Home.jsx pin timeline
export const ZOOM_O_ENTER = 0.06;   // dive into O begins
export const ZOOM_TEXT_END = 0.38;  // header fully revealed
export const ZOOM_PARA_END = 0.52;  // paragraph fully revealed
export const ZOOM_CTA_END = 0.62;   // CTA fully revealed

export const zoomScrollStart = (pct) => `top+=${pct * 100}% top`;
export const zoomScrollEnd = (pct) => `top+=${pct * 100}% top`;
