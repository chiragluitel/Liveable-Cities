import { Amenity, FilterOption, FitnessGoal, Walk } from "@/src/types/TypesForWalkPlanner";

export const MY_WALKS: Walk[] = [
  {
    id: 'w1',
    title: 'Beautiful Walk 1',
    subtitle: 'Suburb Walk, VIC, 3000',
    distanceKm: 2.4,
    durationMin: 32,
    difficulty: 'Easy',
    tags: ['Park', 'Waterway'],
    thumbnailColor: '#C8E6C9',
    rating: 4.7,
    reviewCount: 128,
    isFavorited: true,
    isCompleted: false,
  },
  {
    id: 'w2',
    title: 'Beautiful Walk 2',
    subtitle: 'Suburb Walk, VIC, 3000',
    distanceKm: 5.1,
    durationMin: 68,
    difficulty: 'Moderate',
    tags: ['Hills', 'Scenic'],
    thumbnailColor: '#B2DFDB',
    rating: 4.3,
    reviewCount: 84,
    isFavorited: false,
    isCompleted: true,
  },
  {
    id: 'w3',
    title: 'Beautiful Walk 3',
    subtitle: 'Suburb Walk, VIC, 3000',
    distanceKm: 1.8,
    durationMin: 24,
    difficulty: 'Easy',
    tags: ['Flat', 'Family'],
    thumbnailColor: '#DCEDC8',
    rating: 4.9,
    reviewCount: 210,
    isFavorited: true,
    isCompleted: false,
  },
    {
    id: 'w4',
    title: 'Beautiful Walk 3',
    subtitle: 'Suburb Walk, VIC, 3000',
    distanceKm: 1.8,
    durationMin: 24,
    difficulty: 'Easy',
    tags: ['Flat', 'Family'],
    thumbnailColor: '#DCEDC8',
    rating: 4.9,
    reviewCount: 210,
    isFavorited: true,
    isCompleted: false,
  },
    {
    id: 'w5',
    title: 'Beautiful Walk 3',
    subtitle: 'Suburb Walk, VIC, 3000',
    distanceKm: 1.8,
    durationMin: 24,
    difficulty: 'Easy',
    tags: ['Flat', 'Family'],
    thumbnailColor: '#DCEDC8',
    rating: 4.9,
    reviewCount: 210,
    isFavorited: true,
    isCompleted: false,
  },
    {
    id: 'w6',
    title: 'Beautiful Walk 3',
    subtitle: 'Suburb Walk, VIC, 3000',
    distanceKm: 1.8,
    durationMin: 24,
    difficulty: 'Easy',
    tags: ['Flat', 'Family'],
    thumbnailColor: '#DCEDC8',
    rating: 4.9,
    reviewCount: 210,
    isFavorited: true,
    isCompleted: false,
  },
    {
    id: 'w7',
    title: 'Beautiful Walk 3',
    subtitle: 'Suburb Walk, VIC, 3000',
    distanceKm: 1.8,
    durationMin: 24,
    difficulty: 'Easy',
    tags: ['Flat', 'Family'],
    thumbnailColor: '#DCEDC8',
    rating: 4.9,
    reviewCount: 210,
    isFavorited: true,
    isCompleted: false,
  },
];

export const COMMUNITY_WALKS: Walk[] = [
  {
    id: 'cw1',
    title: 'Beautiful Walk 1',
    subtitle: 'Suburb Walk, VIC, 3000',
    distanceKm: 3.2,
    durationMin: 44,
    difficulty: 'Moderate',
    tags: ['Waterway', 'Scenic'],
    thumbnailColor: '#B3E5FC',
    rating: 4.5,
    reviewCount: 67,
  },
  {
    id: 'cw2',
    title: 'Beautiful Walk 2',
    subtitle: 'Suburb Walk, VIC, 3000',
    distanceKm: 7.6,
    durationMin: 105,
    difficulty: 'Hard',
    tags: ['Trail', 'Challenge'],
    thumbnailColor: '#D1C4E9',
    rating: 4.1,
    reviewCount: 43,
  },
  {
    id: 'cw3',
    title: 'Beautiful Walk 3',
    subtitle: 'Suburb Walk, VIC, 3000',
    distanceKm: 2.0,
    durationMin: 28,
    difficulty: 'Easy',
    tags: ['Dogs', 'Park'],
    thumbnailColor: '#FFE0B2',
    rating: 4.8,
    reviewCount: 156,
  },
];

export const NEARBY_AMENITIES: Amenity[] = [
  {
    id: 'a1',
    name: 'Scenic Amenities',
    type: 'Scenic Amenities',
    distanceM: 320,
    
  },
  {
    id: 'a2',
    name: 'Grebe Park',
    type: 'Grass Park',
    distanceM: 480,
    
  },
  {
    id: 'a3',
    name: 'Scenic Amenities',
    type: 'Scenic Amenities',
    distanceM: 650,
    
  },
  {
    id: 'a4',
    name: 'Sports Park',
    type: 'Sports Facilities',
    distanceM: 820,
  },
  {
    id: 'a5',
    name: 'Scenic Amenities',
    type: 'Scenic Amenities',
    distanceM: 1100,
    
  },
  {
    id: 'a6',
    name: 'Grebe Park',
    type: 'Grass Park',
    distanceM: 1300,
    
  },
    {
    id: 'a7',
    name: 'Grebe Park',
    type: 'Grass Park',
    distanceM: 1300,
    
  },
    {
    id: 'a8',
    name: 'Grebe Park',
    type: 'Grass Park',
    distanceM: 1300
  },
    {
    id: 'a9',
    name: 'Grebe Park',
    type: 'Grass Park',
    distanceM: 1300
  },
    {
    id: 'a10',
    name: 'Grebe Park',
    type: 'Grass Park',
    distanceM: 1300
  },
    {
    id: 'a11',
    name: 'Grebe Park',
    type: 'Grass Park',
    distanceM: 1300
  },
];

export const FITNESS_GOALS: FitnessGoal[] = [
  {
    id: 'g1',
    label: 'Weekly Distance',
    unit: 'km',
    current: 14,
    target: 20
  },
  {
    id: 'g2',
    label: 'Daily Steps',
    unit: 'steps',
    current: 7800,
    target: 10000
  },
];

export const FILTER_OPTIONS: FilterOption[] = [
  { id: 'f1', label: 'Scenic Waterway', type: 'Scenic Waterway' },
  { id: 'f2', label: 'Grebe Park', type: 'Grass Park' },
  { id: 'f3', label: 'Scenic Amenities', type: 'Scenic Amenities' },
  { id: 'f4', label: 'Sports Facilities', type: 'Sports Facilities' },
  { id: 'f5', label: 'Scenic Fun', type: 'Scenic Fun' },
];