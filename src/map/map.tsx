import { HoverCard, Text, Paper, useComputedColorScheme } from "@mantine/core";
import { memo, type Ref } from "react";
// eslint-disable-next-line import/no-unresolved
import Map, { type MapRef, Marker } from "react-map-gl/mapbox";

import { DEFAULT_STYLING, INITIAL_VIEW_STATE, MAPBOX_TOKEN } from "./constants";

import { CardContent } from "../components/card-content";
import { usePriceType } from "../contexts/price-type-context";
import { BeerLocation } from "../types/beerLocation";
import { getPriceBySelectedPriceType } from "../utils";
import "mapbox-gl/dist/mapbox-gl.css";

interface Props {
	beerLocations: BeerLocation[];
	mapRef: Ref<MapRef> | undefined;
}

const MapContainer = ({ beerLocations, mapRef }: Props) => {
	const colorScheme = useComputedColorScheme("light");
	const priceType = usePriceType();
	return (
		<Map
			reuseMaps
			ref={mapRef}
			mapboxAccessToken={MAPBOX_TOKEN}
			initialViewState={INITIAL_VIEW_STATE}
			style={DEFAULT_STYLING}
			mapStyle={
				colorScheme === "light"
					? "mapbox://styles/mapbox/streets-v12"
					: "mapbox://styles/mapbox/dark-v11"
			}
		>
			{beerLocations.map((location) => (
				<Marker
					key={location.name}
					latitude={location.latitude}
					longitude={location.longitude}
				>
					<HoverCard>
						<HoverCard.Target>
							<Paper
								bg="teal.8"
								c="white"
								p="xs"
								withBorder
								shadow="xl"
								radius="50%"
							>
								<Text size="xs" fw={700}>
									{getPriceBySelectedPriceType(priceType)(location)}
								</Text>
							</Paper>
						</HoverCard.Target>
						<HoverCard.Dropdown>
							<CardContent location={location} priceType={priceType} />
						</HoverCard.Dropdown>
					</HoverCard>
				</Marker>
			))}
		</Map>
	);
};

export default memo(MapContainer);
