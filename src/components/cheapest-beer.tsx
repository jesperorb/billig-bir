import { Button, Card, Divider, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

import { CardContent } from "./card-content";

import { usePriceType } from "../contexts/price-type-context";
import { cheapestLocation } from "../db";
import { BeerLocation } from "../types/beerLocation";

interface Props {
	showOnMap: (location: BeerLocation) => void;
}

export const CheapestBeer = ({ showOnMap }: Props) => {
	const priceType = usePriceType();
	return (
		<>
			<Title order={2} size="h3">
				Billigaste ölen
			</Title>
			<Card padding="sm" radius="sm" withBorder>
				<CardContent location={cheapestLocation} priceType={priceType} />
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
		</>
	);
};
