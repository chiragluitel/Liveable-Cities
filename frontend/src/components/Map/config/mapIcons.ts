export type IconName = 'bbq' | 'library' | 'bench' | 'toilet' | 'offLeash' | 'fountain';

export type IconDefinition = {
  iconClass: string;
  color: string;
  label: string;
};

export const ICON_DEFINITIONS: Record<IconName, IconDefinition> = {
  bbq:      { iconClass: 'fa-solid fa-fire',        color: '#f97316', label: 'BBQ' },
  library:  { iconClass: 'fa-solid fa-book-open',   color: '#3b82f6', label: 'Library' },
  bench:    { iconClass: 'fa-solid fa-chair',       color: '#22c55e', label: 'Bench' },
  toilet:   { iconClass: 'fa-solid fa-restroom',    color: '#8b5cf6', label: 'Toilet' },
  offLeash: { iconClass: 'fa-solid fa-dog',         color: '#14b8a6', label: 'Off-leash dog park' },
  fountain: { iconClass: 'fa-solid fa-faucet-drip', color: '#06b6d4', label: 'Water Fountain' },
};

// Same glyph names as iconClass above, so other components match the map's icons.
export const FA6_ICON_NAMES: Record<IconName, string> = {
  bbq: 'fire',
  library: 'book-open',
  bench: 'chair',
  toilet: 'restroom',
  offLeash: 'dog',
  fountain: 'faucet-drip',
};

export type MapIconEntry = {
  id?: string;
  name: IconName;
  lat: number;
  lng: number;
  // Real name from the backend, e.g. "Cranbourne Library". Falls back to the category label.
  placeName?: string;
  label?: string;
};

// This is now only a fallback.
// The actual BBQ, toilet, and off-leash data should come from Casey Open Data.
export const MAP_ICONS: MapIconEntry[] = [];