import {
	ActionIcon,
	Anchor,
	AppShell,
	Box,
	Burger,
	Checkbox,
	Group,
	MantineProvider,
	Modal,
	Slider,
	Space,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";

import { defaultBeerLocations, priceStepsMarkMax, priceStepsMarks } from "./db";
import MapContainer from "./map/map";
import { theme } from "./theme";
import { getStandardAWAdjustedPrice } from "./utils";

import "@mantine/core/styles.css";

const App = () => {
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

	return (
		<MantineProvider theme={theme} defaultColorScheme="dark">
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
						<Title>Billig bir</Title>
					</Group>
				</AppShell.Header>
				<AppShell.Navbar p="md">
					<Stack justify="space-between" h="100%">
						<Stack gap="xl">
							<Box>
								<Text>Pris / 40cl</Text>
								<Slider
									size="sm"
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
							<Text>
								Priserna är justerade efter en{" "}
								<Text fw={700} component="span">
									Standard AW Enhet
								</Text>{" "}
								(
								<Text fs="italic" component="span">
									40 cl
								</Text>
								)
							</Text>
							<Text>
								Om ölen är något annat än 40 cl så visas det justerade priset.
								Hovra över ett ställe för att se originalpriset
							</Text>
						</Stack>
						<ActionIcon
							variant="filled"
							size="xl"
							aria-label="Information"
							onClick={open}
						>
							?
						</ActionIcon>
					</Stack>
				</AppShell.Navbar>
				<AppShell.Main>
					<MapContainer beerLocations={filteredBeerLocations} />
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
