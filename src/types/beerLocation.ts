export interface BeerLocation {
  name: string;
  latitude: number;
  longitude: number;
  price: number;
  outdoorSeating: boolean;
  afternoonSun: boolean;
  beerBrand: string;
  centiliters: number;
  updated: `${number}-${number}-${number}`;
  mapsUrl?: string;
  websiteUrl?: string;
}
