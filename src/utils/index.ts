import { BeerLocation } from "../types/beerLocation";

export const getPrice = (location: BeerLocation) => location.price;

export const getPriceMax = (locations: BeerLocation[]) =>
  Math.max(...locations.map(getPrice));

export const getPriceMin = (locations: BeerLocation[]) =>
  Math.min(...locations.map(getPrice));

export const getPriceSteps = (locations: BeerLocation[]) =>
  Array.from(new Set(locations.map(getPrice))).sort((a, b) => a - b);
