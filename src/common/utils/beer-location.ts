import type { Database } from "@common/api/types";
import type { BeerLocationFormData } from "@common/types/beer-location-form-data";

type BeerLocationInsert = Database["public"]["Tables"]["location"]["Insert"];

export const beerLocationFormDataToSchema = (
	values: BeerLocationFormData,
): BeerLocationInsert => ({
	id: values.id >= 0 ?  values.id :undefined,
	name: values.name,
	latitude: values.latitude,
	longitude: values.longitude,
	beer_brand: values.beerBrand,
	price_standard: values.price,
	price_aw: values.priceAW,
	price_pitcher: values.pricePitcher,
	centiliters_standard: values.centilitersStandard,
	centiliters_pitcher: values.centilitersPitcher,
	outdoor_seating: values.outdoorSeating,
	afternoon_sun: values.afternoonSun,
	url_maps: values.urlMaps,
	url_website: values.urlWebsite,
});


