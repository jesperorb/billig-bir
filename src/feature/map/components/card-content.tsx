import {
	Anchor,
	Badge,
	Divider,
	Group,
	List,
	Tooltip,
	Text,
	Stack,
	ThemeIcon,
	Flex,
} from "@mantine/core";
import {
	IconSun,
	IconSunOff,
	IconBeach,
	IconBeachOff,
} from "@tabler/icons-react";

import { type BeerLocation } from "@common/types/beer-location";
import { PriceType } from "@common/types/common";
import { getPriceForType, getPricePerCl } from "@common/utils/beer-location";

import { AwTimesList } from "./aw-times-list";

export interface CardContentProps {
	location: BeerLocation;
	priceType: PriceType;
}

export const CardContent = ({ location, priceType }: CardContentProps) => {
	const cl =
		priceType === "pricePitcher" && location.centilitersPitcher
			? location.centilitersPitcher.toString()
			: location.centilitersStandard;
	return (
		<Stack gap="sm">
			<Text fw={500}>{location.name}</Text>
			<Flex wrap={"wrap"} gap="xs">
				<Badge color="wine.6">
					{`${getPriceForType(priceType)(location).toString()} kr / ${cl.toString()} cl`}
				</Badge>
				<Badge color="dark">{`${getPricePerCl(priceType)(location).toString()} kr / cl`}</Badge>
			</Flex>
			<Text c="dimmed">Typ: {location.beerBrand}</Text>
			<Divider />
			<Group gap="xs">
				{location.afternoonSun ? (
					<Tooltip label="Eftermiddagssol">
						<ThemeIcon color="hops.8" variant="filled">
							<IconSun aria-label="Eftermiddagssol" stroke={1.5} />
						</ThemeIcon>
					</Tooltip>
				) : (
					<Tooltip label="Ej eftermiddagssol">
						<ThemeIcon color="gray.6" variant="outline">
							<IconSunOff aria-label="Ej eftermiddagssol" stroke={1.5} />
						</ThemeIcon>
					</Tooltip>
				)}
				{location.outdoorSeating ? (
					<Tooltip label="Uteservering">
						<ThemeIcon color="hops.8" variant="filled">
							<IconBeach aria-label="Uteservering" stroke={1.5} />
						</ThemeIcon>
					</Tooltip>
				) : (
					<Tooltip label="Ej uteservering">
						<ThemeIcon color="gray.6" variant="outline">
							<IconBeachOff aria-label="Ej uteservering" stroke={1.5} />
						</ThemeIcon>
					</Tooltip>
				)}
			</Group>
			{location.awTimes && <AwTimesList times={location.awTimes} />}
			<Divider />
			<List>
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
		</Stack>
	);
};
