import {
	AppShell,
	Box,
	Burger,
	Checkbox,
	Group,
	MantineProvider,
	Radio,
	ScrollArea,
	Slider,
	Stack,
	Text,
	Title,
	VisuallyHidden,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useRef, useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { type MapRef } from "react-map-gl/mapbox";

import { CheapestBeer } from "./components/cheapest-beer";
import { InformationModal } from "./components/information-modal";
import { PriceTypeContext } from "./contexts/price-type-context";
import { defaultBeerLocations, priceStepsMarkMax, priceStepsMarks } from "./db";
import MapContainer from "./map/map";
import { theme } from "./theme";
import { ThemeToggle } from "./theme/ThemeToggle";
import { type BeerLocation } from "./types/beerLocation";
import { FilterKey, Filters, PriceType } from "./types/filters";
import { getStandardAdjustedPrice } from "./utils";

import "@mantine/core/styles.css";

const App = () => {
	const mapRef = useRef<MapRef>(null);
	const [opened, { toggle }] = useDisclosure();
	const [filters, setFilters] = useState<Filters>({
		outdoorSeating: false,
		afternoonSun: false,
		price: priceStepsMarkMax,
	});
	const [priceType, setPriceType] = useState<PriceType>("price");
	const [beerLocations] = useState(defaultBeerLocations);

	const filteredBeerLocations = useMemo(
		() =>
			beerLocations.filter((location) =>
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
			),
		[beerLocations, filters, priceType],
	);

	const showOnMap = (location: BeerLocation) => {
		toggle();
		mapRef.current?.flyTo({
			center: [location.longitude, location.latitude],
			zoom: 17,
			essential: true,
		});
	};

	const setFilterProperty = (key: FilterKey, value: Filters[FilterKey]) => {
		setFilters((previous) => ({ ...previous, [key]: value }));
	};

	return (
		<MantineProvider theme={theme} defaultColorScheme="light">
			<PriceTypeContext value={priceType}>
				<AppShell
					header={{ height: 60 }}
					navbar={{
						width: 300,
						breakpoint: "sm",
						collapsed: { mobile: !opened },
					}}
				>
					<AppShell.Header>
						<Group h="100%" px="md">
							<Burger
								opened={opened}
								onClick={toggle}
								hiddenFrom="sm"
								size="sm"
							/>
							<Title order={1}>Billig bir</Title>
						</Group>
					</AppShell.Header>
					<AppShell.Navbar>
						<ScrollArea scrollbars="y">
							<Stack justify="space-between" h="100%" p="md">
								<Stack gap="lg">
									<VisuallyHidden>
										<Title order={2} size="h3">
											Inställningar
										</Title>
									</VisuallyHidden>
									<Radio.Group
										value={priceType}
										onChange={(newPriceType) => {
											setPriceType(newPriceType as PriceType);
										}}
										name="priceType"
										label="Pristyp"
									>
										<Group justify="space-between" mt="sm">
											<Radio value="price" label="Standard" />
											<Radio value="priceAW" label="AW" />
											<Radio value="pricePitcher" label="Kanna" />
										</Group>
									</Radio.Group>
									<Box>
										<Text>Pris / 40cl</Text>
										<Slider
											size="sm"
											mb="sm"
											value={filters.price}
											onChange={(newPrice) => {
												setFilterProperty("price", newPrice);
											}}
											marks={priceStepsMarks}
											max={priceStepsMarkMax}
										/>
									</Box>
									<Checkbox
										label="Uteservering"
										checked={Boolean(filters.outdoorSeating)}
										onChange={(event) => {
											setFilterProperty(
												"outdoorSeating",
												event.currentTarget.checked,
											);
										}}
									/>
									<Checkbox
										label="Eftermiddagssol"
										checked={Boolean(filters.afternoonSun)}
										onChange={(event) => {
											setFilterProperty(
												"afternoonSun",
												event.currentTarget.checked,
											);
										}}
									/>
									<CheapestBeer showOnMap={showOnMap} />
								</Stack>
								<Group>
									<ThemeToggle />
									<InformationModal />
								</Group>
							</Stack>
						</ScrollArea>
					</AppShell.Navbar>
					<AppShell.Main>
						<VisuallyHidden>
							<Title order={2}>Karta</Title>
						</VisuallyHidden>
						<MapContainer
							mapRef={mapRef}
							beerLocations={filteredBeerLocations}
						/>
					</AppShell.Main>
				</AppShell>
			</PriceTypeContext>
		</MantineProvider>
	);
};

export default App;
