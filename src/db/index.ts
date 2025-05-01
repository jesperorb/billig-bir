import { type BeerLocation } from "../types/beerLocation";
import { getPriceMax, getPriceMin, getPriceSteps } from "../utils";

export const defaultBeerLocations: BeerLocation[] = [
  {
    name: "The Lobby",
    latitude: 59.333755553636294,
    longitude: 18.056847334126804,
    price: 39,
    outdoorSeating: false,
    afternoonSun: true,
    updated: "2025-05-01",
    websiteUrl: "http://www.thelobbysthlm.nu/",
    mapsUrl: "https://maps.app.goo.gl/KTD3kZtC1r97fwYAA",
  },
  {
    name: "Vapiano",
    latitude: 59.3306652868022,
    longitude: 18.059884607646538,
    price: 69,
    outdoorSeating: true,
    afternoonSun: true,
    updated: "2025-05-01",
    websiteUrl: "http://vapiano.se/",
    mapsUrl: "https://maps.app.goo.gl/7Nr3D8m65pkrMdgk6",
  },
  {
    name: "O'learys",
    latitude: 59.33076489403867,
    longitude: 18.059353141557526,
    price: 2000,
    outdoorSeating: true,
    afternoonSun: false,
    updated: "2025-05-01",
    websiteUrl: "https://olearys.se/stockholm-central/food/",
    mapsUrl: "https://maps.app.goo.gl/4MNdP27BZ4RVU6yZA",
  },
];

export const priceMax = getPriceMax(defaultBeerLocations);

export const priceMin = getPriceMin(defaultBeerLocations);

export const priceSteps = getPriceSteps(defaultBeerLocations);

export const priceStepsMinMax = [0, priceMax] as [number, number];

export const priceStepsMarks: { value: number; label: number }[] = [
  { value: 0, label: 0 },
  ...priceSteps.map((step) => ({
    value: step,
    label: step,
  })),
];
