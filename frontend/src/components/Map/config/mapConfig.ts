import { IconName } from './mapIcons';

// Default centre and zoom for City of Casey Council building. Not used once user shares location.
export const CASEY_COORDINATES = {
  latitude: -38.0267,
  longitude: 145.2940,
};

// Fallback zoom, and the zoom used once the map centres on the user's location.
export const DEFAULT_ZOOM = 15.4;

// Icon types shown on load. Remove a type from this list to hide it by default.
export const DEFAULT_VISIBLE_ICONS: IconName[] = ['bbq', 'library', 'toilet', 'fountain'];
