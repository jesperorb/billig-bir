import type { StyleProp, MantineSpacing } from "@mantine/core";
import type { ReactNode } from "react";

import type { BeerLocation } from "@common/types/beer-location";
import type { District } from "@common/types/district";

export type ColumnKeys =
	| keyof BeerLocation
	| "pricePerCentiliter"
	| "priceAWPerCentiliter";

export interface BeerLocationTableProps {
	data: BeerLocation[] | undefined;
	districts?: District[];
	isLoading?: boolean;
	actionColumn?: {
		header: string;
		icon: ReactNode;
		onClick: (location: BeerLocation) => void;
		ariaLabel: (location: BeerLocation) => string;
	};
	filterPadding?: StyleProp<MantineSpacing>;
}
