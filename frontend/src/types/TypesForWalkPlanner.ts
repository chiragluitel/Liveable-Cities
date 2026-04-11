export type WalkDifficulty = 'Easy' | 'Moderate' | 'Hard';

export type AmenityType =
  | 'Scenic Waterway'
  | 'Grass Park'
  | 'Scenic Amenities'
  | 'Sports Facilities'
  | 'Scenic Fun';


export interface Walk {
  id: string;
  title: string;
  subtitle: string;
  distanceKm: number;
  durationMin: number;
  difficulty: WalkDifficulty;
  tags: string[];
  thumbnailColor: string;
  rating?: number;
  reviewCount?: number;
  isFavorited?: boolean;
  isCompleted?: boolean;
}


export interface Amenity {
  id: string;
  name: string;
  type: AmenityType;
  distanceM: number;
  iconEmoji: string;
}


export interface FitnessGoal {
  id: string;
  label: string;
  unit: string;
  current: number;
  target: number;
  accentColor: string;
}


export interface FilterOption {
  id: string;
  label: string;
  type: AmenityType;
}