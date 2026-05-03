export type IconName = 'bbq' | 'library' | 'bench' | 'toilet';

export type IconDefinition = {
  emoji: string;
  label: string;
};

export const ICON_DEFINITIONS: Record<IconName, IconDefinition> = {
  bbq:     { emoji: '🍖', label: 'BBQ' },
  library: { emoji: '📚', label: 'Library' },
  bench:   { emoji: '🪑', label: 'Bench' },
  toilet:  { emoji: '🚻', label: 'Toilet' },
};

export type MapIconEntry = {
  name: IconName;
  lat: number;
  lng: number;
};

export const MAP_ICONS: MapIconEntry[] = [
  // Example { name: 'bbq' (ensure name exists in ICON_DEFINITIONS), lat: -38.0267, lng: 145.2940 }
  {name: 'bbq', lat: -37.9996380059574, lng: 145.29520401125885},
  {name: 'toilet', lat: -38.21703954555179, lng: 	145.38577168307344},
  {name: 'library', lat: -38.0336901148, lng: 145.264508635},
  {name: 'bench', lat: -38.02465972598545, lng: 145.24963257794886}
];
