import {
	Anchor,
	Badge,
	Divider,
	Group,
	List,
	Tooltip,
	Text,
} from "@mantine/core";
import {
	IconSun,
	IconSunOff,
	IconBeach,
	IconBeachOff,
} from "@tabler/icons-react";

import { BeerLocation } from "../types/beerLocation";
import { getStandardAWAdjustedPrice } from "../utils";

export interface CardContentProps {
	location: BeerLocation;
}

export const CardContent = ({ location }: CardContentProps) => {
	return (
		<>
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
			<Group gap="xs" mb="sm">
				{location.afternoonSun ? (
					<Tooltip label="Eftermiddagssol">
						<IconSun
							aria-label="Eftermiddagssol"
							stroke={1.5}
							style={{
								color: "var(--mantine-color-teal-filled)",
							}}
						/>
					</Tooltip>
				) : (
					<Tooltip label="Ej eftermiddagssol">
						<IconSunOff
							aria-label="Ej eftermiddagssol"
							stroke={1.5}
							style={{
								color: "var(--mantine-color-red-filled)",
							}}
						/>
					</Tooltip>
				)}
				{location.outdoorSeating ? (
					<Tooltip label="Uteservering">
						<IconBeach
							aria-label="Uteservering"
							stroke={1.5}
							style={{
								color: "var(--mantine-color-teal-filled)",
							}}
						/>
					</Tooltip>
				) : (
					<Tooltip label="Ej uteservering">
						<IconBeachOff
							aria-label="Ej uteservering"
							stroke={1.5}
							style={{
								color: "var(--mantine-color-red-filled)",
							}}
						/>
					</Tooltip>
				)}
			</Group>
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
		</>
	);
};
