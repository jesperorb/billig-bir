export interface BeerLocation {
  name: string;
  latitude: number;
  longitude: number;
  price: number;
  outdoorSeating: boolean;
  afternoonSun: boolean;
  updated: `${number}-${number}-${number}`;
  mapsUrl?: string;
  websiteUrl?: string;
}
