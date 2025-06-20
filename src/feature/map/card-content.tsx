import { type BeerLocation } from "@common/types/beerLocation";
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
import { type PriceType } from "./filters";
import { getPriceBySelectedPriceType } from "./utils";

export interface CardContentProps {
	location: BeerLocation;
	priceType: PriceType;
}

export const CardContent = ({ location, priceType }: CardContentProps) => {
	return (
		<>
			<Group justify="space-between">
				<Text fw={500}>{location.name}</Text>
				<Badge color="teal">
					{`${getPriceBySelectedPriceType(priceType)(location)?.toString() ?? "N/A"} kr / ${priceType === "pricePitcher" && location.centilitersPitcher ? location.centilitersPitcher.toString() : "40"} cl`}
				</Badge>
			</Group>
			<Group justify="space-between">
				<Text c="dimmed">Typ: {location.beerBrand}</Text>
				{location.centilitersStandard !== 40 && (
					<Badge color="dark">
						{`${location.price.toString()} kr / ${location.centilitersStandard.toString()} cl`}
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
				{location.urlMaps && (
					<List.Item>
						<Anchor href={location.urlMaps} target="_blank">
							Google Maps
						</Anchor>
					</List.Item>
				)}
				{location.urlWebsite && (
					<List.Item>
						<Anchor href={location.urlWebsite} target="_blank">
							Hemsida
						</Anchor>
					</List.Item>
				)}
			</List>
		</>
	);
};
