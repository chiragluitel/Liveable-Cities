export type IconName = 'bbq' | 'library' | 'bench' | 'toilet' | 'fountain';

export type IconDefinition = {
  iconClass: string;
  color: string;
  label: string;
};

export const ICON_DEFINITIONS: Record<IconName, IconDefinition> = {
  bbq:     { iconClass: 'fa-solid fa-fire',      color: '#f97316', label: 'BBQ'     },
  library: { iconClass: 'fa-solid fa-book-open', color: '#3b82f6', label: 'Library' },
  bench:   { iconClass: 'fa-solid fa-chair',     color: '#22c55e', label: 'Bench'   },
  toilet:  { iconClass: 'fa-solid fa-restroom',  color: '#8b5cf6', label: 'Toilet'  },
  fountain: { iconClass: 'fa-solid fa-faucet-drip', color: '#06b6d4', label: 'Water Fountain' },
};

export type MapIconEntry = {
  name: IconName;
  lat: number;
  lng: number;
  // Real name from the backend, e.g. "Cranbourne Library". Falls back to the category label.
  placeName?: string;
};

export const MAP_ICONS: MapIconEntry[] = [
  { name: 'bbq',     lat: -37.9996380059574,   lng: 145.29520401125885  },
  { name: 'toilet',  lat: -38.21703954555179,   lng: 145.38577168307344  },
  { name: 'library', lat: -38.0336901148,        lng: 145.264508635       },
  { name: 'bench',   lat: -38.02465972598545,   lng: 145.24963257794886  },
];
