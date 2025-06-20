import {
	AppShell,
	ScrollArea,
	Stack,
	Title,
	VisuallyHidden,
} from "@mantine/core";
import { useMemo, useRef, useState } from "react";
import { MapRef } from "react-map-gl/mapbox";

import { getCheapestLocation, getStandardAdjustedPrice, priceStepsMarkMax } from "@feature/map/utils";
import { Filters, PriceType } from "@feature/map/filters";
import { BeerLocation } from "@common/types/beerLocation";

import { PriceTypeContext, SetPriceTypeContext } from "./price-type-context";
import MapContainer from "./map-container";
import { FiltersForm } from "./filters-form";
import { useBeerLocations } from "./queries";
import { CheapestBeer } from "./cheapest-beer";

interface Props {
	toggleMenu: () => void;
}

export const Map = ({ toggleMenu }: Props) => {
	const mapRef = useRef<MapRef>(null);
	const [filters, setFilters] = useState<Filters>({
		outdoorSeating: false,
		afternoonSun: false,
		price: priceStepsMarkMax,
	});
	const [priceType, setPriceType] = useState<PriceType>("price");
	const { data } = useBeerLocations();

	const filteredBeerLocations = useMemo(
		() =>
			data?.filter((location) =>
				Object.entries(filters).every(([key, value]) => {
					if (key === "price" && typeof value === "number") {
						const hasValidSelectedPriceType =
							location[priceType] && location[priceType] <= value;
						return priceType === "price"
							? getStandardAdjustedPrice(location) <= value
							: hasValidSelectedPriceType;
					}
					return value === false
						? true
						: value === location[key as keyof BeerLocation];
				}),
			) ?? [],
		[data, filters, priceType],
	);

	const cheapestBeer = useMemo(() =>
		getCheapestLocation(filteredBeerLocations)
		, [filteredBeerLocations]
	)

	const showOnMap = (location: BeerLocation) => {
		toggleMenu();
		mapRef.current?.flyTo({
			center: [location.longitude, location.latitude],
			zoom: 17,
			essential: true,
		});
	};

	return (
		<>
			<AppShell.Navbar>
				<ScrollArea scrollbars="y">
					<Stack justify="space-around" h="100%" p="md">
						<FiltersForm filters={filters} setFilters={setFilters} />
						<CheapestBeer location={cheapestBeer} showOnMap={showOnMap} />
					</Stack>
				</ScrollArea>
			</AppShell.Navbar>
			<AppShell.Main>
				<SetPriceTypeContext value={setPriceType}>
					<PriceTypeContext value={priceType}>
						<VisuallyHidden>
							<Title order={2}>Karta</Title>
						</VisuallyHidden>
						<MapContainer
							mapRef={mapRef}
							beerLocations={filteredBeerLocations}
						/>
					</PriceTypeContext>
				</SetPriceTypeContext>
			</AppShell.Main>
		</>

	);
};
