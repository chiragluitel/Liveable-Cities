import { IconName } from './mapIcons';

// Default centre and zoom for City of Casey Council building. Not used once user shares location.
export const CASEY_COORDINATES = {
  latitude: -38.0267,
  longitude: 145.2940,
};

export const DEFAULT_ZOOM = 13;

// Icon types shown on load. Remove a type from this list to hide it by default.
export const DEFAULT_VISIBLE_ICONS: IconName[] = ['bbq', 'library', 'bench', 'toilet'];
