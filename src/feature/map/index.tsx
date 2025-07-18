import {
	AppShell,
	ScrollArea,
	Stack,
	Title,
	VisuallyHidden,
} from "@mantine/core";
import { useMemo, useRef, useState } from "react";
import type { MapRef } from "react-map-gl/mapbox";

import { useBeerLocations, useDistricts } from "@common/api/queries";
import { useToggleIsMenuOpen } from "@common/context/menu-context";
import { BeerLocation } from "@common/types/beer-location";
import { Filters, PriceType } from "@feature/map/filters";
import {
	PriceTypeContext,
	SetPriceTypeContext,
} from "@feature/map/price-type-context";
import {
	getCheapestLocation,
	getStandardAdjustedPrice,
	priceStepsMarkMax,
} from "@feature/map/utils";

import { CheapestBeer } from "./components/cheapest-beer";
import { FiltersForm } from "./components/filters-form";
import MapContainer from "./components/map-container";
import { MapMarkers } from "./components/map-markers";

const Map = () => {
	const mapRef = useRef<MapRef>(null);
	const toggleMenu = useToggleIsMenuOpen();
	const [filters, setFilters] = useState<Filters>({
		outdoorSeating: false,
		afternoonSun: false,
		price: priceStepsMarkMax,
		districts: [],
	});
	const [priceType, setPriceType] = useState<PriceType>("price");
	const { data } = useBeerLocations();
	const { data: districts } = useDistricts();

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
					if (key === "districts" && Array.isArray(value)) {
						// If no districts selected or all districts selected, show all locations
						if (value.length === 0 || value.length === districts?.length) {
							return true;
						}
						// Check if location has any of the selected districts
						return (
							location.districts?.some((locationDistrict) =>
								value.some(
									(selectedDistrict) =>
										selectedDistrict.id === locationDistrict.id,
								),
							) ?? false
						);
					}
					return value === false
						? true
						: value === location[key as keyof BeerLocation];
				}),
			) ?? [],
		[data, filters, priceType, districts],
	);

	const cheapestBeer = useMemo(
		() => getCheapestLocation(filteredBeerLocations),
		[filteredBeerLocations],
	);

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
			<SetPriceTypeContext value={setPriceType}>
				<PriceTypeContext value={priceType}>
					<AppShell.Navbar>
						<ScrollArea scrollbars="y">
							<Stack justify="space-around" h="100%" p="md">
								<FiltersForm
									filters={filters}
									setFilters={setFilters}
									districts={districts ?? []}
								/>
								{cheapestBeer && (
									<CheapestBeer location={cheapestBeer} showOnMap={showOnMap} />
								)}
							</Stack>
						</ScrollArea>
					</AppShell.Navbar>
					<AppShell.Main>
						<VisuallyHidden>
							<Title order={2}>Karta</Title>
						</VisuallyHidden>
						<MapContainer mapRef={mapRef}>
							<MapMarkers beerLocations={filteredBeerLocations} />
						</MapContainer>
					</AppShell.Main>
				</PriceTypeContext>
			</SetPriceTypeContext>
		</>
	);
};

export default Map;
