import { MultiSelect } from "@mantine/core";

import { District } from "@common/types/district";
import { districtToSelectItemGroups } from "@common/utils/district";

interface Props {
	value: string[];
	districts: District[];
	onChange: (value: string[]) => void;
}

const defaultStyle = { flexGrow: 1, minWidth: 300 };

export const DistrictSelect = ({ value, districts, onChange }: Props) => (
	<MultiSelect
		label="Stadsdelar"
		placeholder="Filtrera på stadsdelar"
		data={districtToSelectItemGroups(districts)}
		value={value}
		onChange={onChange}
		searchable
		clearable
		style={defaultStyle}
	/>
);
