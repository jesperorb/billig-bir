import {
	Badge,
	HoverCard,
	Text,
	Anchor,
	Group,
	List,
	Divider,
	Paper,
	useComputedColorScheme,
	Tooltip,
} from "@mantine/core";
import {
	IconBeach,
	IconBeachOff,
	IconSun,
	IconSunOff,
} from "@tabler/icons-react";
import { memo } from "react";
// eslint-disable-next-line import/no-unresolved
import Map, { Marker } from "react-map-gl/mapbox";

import { DEFAULT_STYLING, INITIAL_VIEW_STATE, MAPBOX_TOKEN } from "./constants";

import { BeerLocation } from "../types/beerLocation";
import "mapbox-gl/dist/mapbox-gl.css";
import { getStandardAWAdjustedPrice } from "../utils";

interface Props {
	beerLocations: BeerLocation[];
}

const MapContainer = ({ beerLocations }: Props) => {
	const colorScheme = useComputedColorScheme("light");
	return (
		<Map
			reuseMaps
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
								radius="xl"
							>
								<Text size="xs" fw={700}>
									{getStandardAWAdjustedPrice(location)}
								</Text>
							</Paper>
						</HoverCard.Target>
						<HoverCard.Dropdown>
							<Group justify="space-between">
								<Text fw={500}>{location.name}</Text>
								<Badge color="teal">
									{`${getStandardAWAdjustedPrice(location).toString()} kr / 40 cl`}
								</Badge>
							</Group>
							<Group justify="space-between">
								<Text c="dimmed">Typ: {location.beerBrand}</Text>
								{location.centiliters !== 40 && (
									<Badge color="dark">
										{`${location.price.toString()} kr / ${location.centiliters.toString()} cl`}
									</Badge>
								)}
							</Group>
							<Divider mt="sm" mb="sm" variant="dotted" />
							{location.afternoonSun ? (
								<Tooltip label="Eftermiddagssol">
									<IconSun aria-label="Eftermiddagssol" stroke={1.5} />
								</Tooltip>
							) : (
								<Tooltip label="Ej eftermiddagssol">
									<IconSunOff aria-label="Ej eftermiddagssol" stroke={1.5} />
								</Tooltip>
							)}
							{location.outdoorSeating ? (
								<Tooltip label="Uteservering">
									<IconBeach aria-label="Uteservering" stroke={1.5} />
								</Tooltip>
							) : (
								<Tooltip label="Ej uteservering">
									<IconBeachOff aria-label="Ej uteservering" stroke={1.5} />
								</Tooltip>
							)}
							<Divider variant="dotted" />
							<List mt="sm" mb="sm">
								{location.mapsUrl && (
									<List.Item>
										<Anchor href={location.mapsUrl} target="_blank">
											Google Maps
										</Anchor>
									</List.Item>
								)}
								{location.websiteUrl && (
									<List.Item>
										<Anchor href={location.websiteUrl} target="_blank">
											Hemsida
										</Anchor>
									</List.Item>
								)}
							</List>
							<Divider variant="dotted" mb="sm" />
							<Text c="dimmed">Uppdaterad: {location.updated}</Text>
						</HoverCard.Dropdown>
					</HoverCard>
				</Marker>
			))}
		</Map>
	);
};

export default memo(MapContainer);
