import {
	ActionIcon,
	Anchor,
	AppShell,
	Box,
	Burger,
	Button,
	Card,
	Checkbox,
	Divider,
	Group,
	MantineProvider,
	Modal,
	Slider,
	Space,
	Stack,
	Text,
	Title,
	VisuallyHidden,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import { useMemo, useRef, useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { type MapRef } from "react-map-gl/mapbox";

import { CardContent } from "./components/card-content";
import {
	cheapestLocation,
	defaultBeerLocations,
	priceStepsMarkMax,
	priceStepsMarks,
} from "./db";
import MapContainer from "./map/map";
import { theme } from "./theme";
import { ThemeToggle } from "./theme/ThemeToggle";
import { BeerLocation } from "./types/beerLocation";
import { getStandardAWAdjustedPrice } from "./utils";

import "@mantine/core/styles.css";

const App = () => {
	const mapRef = useRef<MapRef>(null);
	const [beerLocations] = useState(defaultBeerLocations);
	const [opened, { toggle }] = useDisclosure();
	const [modalOpened, { open, close }] = useDisclosure(false);
	const [outdoorSeating, setOutdoorSeating] = useState(false);
	const [afternoonSun, setAfternoonSun] = useState(false);
	const [maxPrice, setMaxPrice] = useState(priceStepsMarkMax);

	const filteredBeerLocations = useMemo(
		() =>
			beerLocations
				.filter((location) => (outdoorSeating ? location.outdoorSeating : true))
				.filter((location) => (afternoonSun ? location.afternoonSun : true))
				.filter((location) => getStandardAWAdjustedPrice(location) <= maxPrice),
		[afternoonSun, beerLocations, maxPrice, outdoorSeating],
	);

	const showOnMap = (location: BeerLocation) => {
		toggle();
		mapRef.current?.flyTo({
			center: [location.longitude, location.latitude],
			zoom: 17,
			essential: true,
		});
	};

	return (
		<MantineProvider theme={theme} defaultColorScheme="light">
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
				<AppShell.Navbar p="md">
					<Stack justify="space-between" h="100%">
						<Stack gap="lg">
							<Title order={2} size="h3">
								Inställningar
							</Title>
							<Box>
								<Text>Pris / 40cl</Text>
								<Slider
									size="sm"
									mb="sm"
									value={maxPrice}
									onChange={setMaxPrice}
									marks={priceStepsMarks}
								/>
							</Box>
							<Checkbox
								label="Uteservering"
								checked={outdoorSeating}
								onChange={(event) => {
									setOutdoorSeating(event.currentTarget.checked);
								}}
							/>
							<Checkbox
								label="Eftermiddagssol"
								checked={afternoonSun}
								onChange={(event) => {
									setAfternoonSun(event.currentTarget.checked);
								}}
							/>
							<Title order={2} size="h3">
								Billigaste ölen
							</Title>
							<Card padding="sm" radius="sm" withBorder>
								<CardContent location={cheapestLocation} />
								<Divider variant="dotted" mb="sm" mt="sm" />
								<Button
									rightSection={<IconChevronRight size={14} />}
									fullWidth
									justify="space-between"
									onClick={() => {
										showOnMap(cheapestLocation);
									}}
								>
									Visa på karta
								</Button>
							</Card>
						</Stack>
						<Group>
							<ThemeToggle />
							<ActionIcon
								variant="filled"
								size="xl"
								aria-label="Information"
								onClick={open}
							>
								?
							</ActionIcon>
						</Group>
					</Stack>
				</AppShell.Navbar>
				<AppShell.Main>
					<VisuallyHidden>
						<Title order={2}>Karta</Title>
					</VisuallyHidden>
					<MapContainer mapRef={mapRef} beerLocations={filteredBeerLocations} />
				</AppShell.Main>
			</AppShell>
			<Modal opened={modalOpened} onClose={close} title="Information">
				<Text>
					GitHub:{" "}
					<Anchor
						href="https://github.com/jesperorb/billig-bir"
						target="_blank"
					>
						https://github.com/jesperorb/billig-bir
					</Anchor>
				</Text>
				<Space />
				<Text>
					Lägg till nya ställen genom att redigera:{" "}
					<Anchor href="https://github.com/jesperorb/billig-bir/blob/main/src/db/index.ts">
						src/db/index.ts
					</Anchor>
				</Text>
			</Modal>
		</MantineProvider>
	);
};

export default App;
