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

import {
	AWStartAndEndTimes,
	AWStartAndEndTimesForWeekdays,
	BeerLocation,
} from "../types/beerLocation";
import { PriceType } from "../types/filters";
import { getPriceBySelectedPriceType, getWeekdayTranslation } from "../utils";

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
			{location.AWDetails && location.priceAW ? (
				<>
					<Divider mt="sm" mb="sm" variant="dotted" />
					<Text>AW-tider</Text>
					<List mb="sm" pl="xs">
						{location.AWDetails.time ? (
							<List.Item>{`${location.AWDetails.time.start}-${location.AWDetails.time.end}`}</List.Item>
						) : (
							Object.entries(location.AWDetails.times).map(
								([weekday, time]) => {
									const times = time as AWStartAndEndTimes;
									const day = weekday as keyof AWStartAndEndTimesForWeekdays;
									return (
										<List.Item key={`${weekday}${times.start}-${times.end}`}>
											<Text component="span">{`${getWeekdayTranslation[day]}: `}</Text>
											<Text
												component="span"
												ta="right"
											>{`${times.start}-${times.end}`}</Text>
										</List.Item>
									);
								},
							)
						)}
					</List>
				</>
			) : null}

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
