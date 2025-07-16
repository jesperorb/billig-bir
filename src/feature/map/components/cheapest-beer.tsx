import { Button, Card, Divider, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

import { type BeerLocation } from "@common/types/beer-location";
import { usePriceType } from "@feature/map/price-type-context";

import { CardContent } from "./card-content";

interface Props {
	location: BeerLocation;
	showOnMap: (location: BeerLocation) => void;
}

export const CheapestBeer = ({ showOnMap, location }: Props) => {
	const priceType = usePriceType();
	return (
		<>
			<Title order={2} size="h3">
				Billigaste ölen
			</Title>
			<Card padding="sm" radius="sm" withBorder>
				<CardContent location={location} priceType={priceType} />
				<Divider variant="dotted" mb="sm" mt="sm" />
				<Button
					rightSection={<IconChevronRight size={14} />}
					fullWidth
					justify="space-between"
					onClick={() => {
						showOnMap(location);
					}}
				>
					Visa på karta
				</Button>
			</Card>
		</>
	);
};
