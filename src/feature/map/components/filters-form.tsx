import {
	Box,
	Group,
	Radio,
	Stack,
	Title,
	VisuallyHidden,
	Text,
	Checkbox,
	Slider,
	MultiSelect
} from "@mantine/core";

import { FilterKey, Filters, PriceType } from "@feature/map/filters";
import { priceStepsMarkMax, priceStepsMarks } from "@feature/map/utils";
import { useSetPriceType, usePriceType } from "@feature/map/price-type-context";
import { District } from "@common/types/district";


interface Props {
	filters: Filters
	districts: District[];
	setFilters: (filters: Filters) => void;
}

export const FiltersForm = ({ filters, setFilters, districts }: Props) => {
	const priceType = usePriceType();
	const setPriceType = useSetPriceType()
	const setFilterProperty = (key: FilterKey, value: Filters[FilterKey]) => {
		setFilters({ ...filters, [key]: value });
	};
	return (
		<Stack gap="lg">
			<VisuallyHidden>
				<Title order={2} size="h3">
					Inställningar
				</Title>
			</VisuallyHidden>
			<Radio.Group
				value={priceType}
				onChange={(newPriceType) => {
					setPriceType(newPriceType as PriceType);
				}}
				name="priceType"
				label="Pristyp"
			>
				<Group justify="space-between" mt="sm">
					<Radio value="price" label="Standard" />
					<Radio value="priceAW" label="AW" />
					<Radio value="pricePitcher" label="Kanna" />
				</Group>
			</Radio.Group>
			<Box>
				<Text>Pris / 40cl</Text>
				<Slider
					size="sm"
					mb="sm"
					value={filters.price}
					onChange={(newPrice) => {
						setFilterProperty("price", newPrice);
					}}
					marks={priceStepsMarks}
					max={priceStepsMarkMax}
				/>
			</Box>
			<Checkbox
				label="Uteservering"
				checked={Boolean(filters.outdoorSeating)}
				onChange={(event) => {
					setFilterProperty(
						"outdoorSeating",
						event.currentTarget.checked,
					);
				}}
			/>
			<Checkbox
				label="Eftermiddagssol"
				checked={Boolean(filters.afternoonSun)}
				onChange={(event) => {
					setFilterProperty(
						"afternoonSun",
						event.currentTarget.checked,
					);
				}}
			/>
			<MultiSelect
				label="Stadsdelar"
				placeholder="Välj stadsdelar"
				data={districts.map(district => ({
					value: district.id.toString(),
					label: district.name
				}))}
				value={filters.districts.map(d => d.id.toString())}
				onChange={(selectedIds) => {
					const selectedDistricts = districts.filter(district =>
						selectedIds.includes(district.id.toString())
					);
					setFilterProperty("districts", selectedDistricts);
				}}
				searchable
				clearable
			/>
		</Stack>
	)
}
