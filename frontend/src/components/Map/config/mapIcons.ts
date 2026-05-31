export type IconName = 'bbq' | 'library' | 'bench' | 'toilet';

export type IconDefinition = {
  iconSvg: string;
  color: string;
  label: string;
};

export const ICON_DEFINITIONS: Record<IconName, IconDefinition> = {
  bbq: {
    color: '#f97316',
    label: 'BBQ',
    iconSvg: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  },
  library: {
    color: '#3b82f6',
    label: 'Library',
    iconSvg: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  },
  bench: {
    color: '#22c55e',
    label: 'Bench',
    iconSvg: '<path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"/><line x1="5" y1="18" x2="5" y2="20"/><line x1="19" y1="18" x2="19" y2="20"/>',
  },
  toilet: {
    color: '#8b5cf6',
    label: 'Toilet',
    iconSvg: '<circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><line x1="12" y1="10" x2="12" y2="14"/>',
  },
};

export type MapIconEntry = {
  name: IconName;
  lat: number;
  lng: number;
};

export const MAP_ICONS: MapIconEntry[] = [
  { name: 'bbq',     lat: -37.9996380059574,   lng: 145.29520401125885  },
  { name: 'toilet',  lat: -38.21703954555179,   lng: 145.38577168307344  },
  { name: 'library', lat: -38.0336901148,        lng: 145.264508635       },
  { name: 'bench',   lat: -38.02465972598545,   lng: 145.24963257794886  },
];
