import { ComboboxItemGroup, type ComboboxItem } from "@mantine/core";

import { District } from "@common/types/district";

export const isInsideTolls = (district: District): boolean =>
	district.insideTolls;

export const isOutsideTolls = (district: District): boolean =>
	!isInsideTolls(district);

export const getDistrictName = (district: District): string => district.name;

export const districtToSelectItem = (district: District): ComboboxItem => ({
	value: district.id.toString(),
	label: district.name,
});

export const districtToSelectItemGroups = (
	districts: District[],
): ComboboxItemGroup[] => [
	{
		group: "Innanför tullarna",
		items: districts.filter(isInsideTolls).map(districtToSelectItem),
	},
	{
		group: "Utanför tullarna",
		items: districts.filter(isOutsideTolls).map(districtToSelectItem),
	},
];
