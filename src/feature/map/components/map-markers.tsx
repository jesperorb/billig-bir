import { Box, HoverCard, Text } from "@mantine/core";
import { Marker } from "react-map-gl/mapbox";

import type { BeerLocation } from "@common/types/beer-location";
import { getPriceForType } from "@common/utils/beer-location";

import { usePriceType } from "../price-type-context";

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
							<Box
								bg="gold.7"
								c="white"
								p="xs"
								w="2rem"
								h="2rem"
								style={(theme) => ({
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									borderRadius: "50%",
									boxShadow: theme.shadows.xl,
								})}
							>
								<Text size="xs" fw={700}>
									{getPriceForType(priceType)(location)}
								</Text>
							</Box>
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
