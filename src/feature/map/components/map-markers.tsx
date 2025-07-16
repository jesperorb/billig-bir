import { HoverCard, Paper, Text } from "@mantine/core";
import { Marker } from "react-map-gl/mapbox";

import type { BeerLocation } from "@common/types/beer-location";

import { usePriceType } from "../price-type-context";
import { getPriceBySelectedPriceType } from "../utils";

import { CardContent } from "./card-content";

interface Props {
	beerLocations: BeerLocation[];
}

export const MapMarkers = ({ beerLocations }: Props) => {
	const priceType = usePriceType();
	return (
		<>
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
		</>
	);
};
