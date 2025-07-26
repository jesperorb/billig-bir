import { type MantineStyleProp, MultiSelect } from "@mantine/core";

import { District } from "@common/types/district";
import { districtToSelectItemGroups } from "@common/utils/district";

interface Props {
	value: string[];
	districts: District[];
	onChange: (value: string[]) => void;
	style?: MantineStyleProp;
}

const defaultStyle = { flexGrow: 1, minWidth: 200 };

export const DistrictSelect = ({
	value,
	districts,
	onChange,
	style = defaultStyle,
}: Props) => (
	<MultiSelect
		label="Stadsdelar"
		placeholder="Filtrera på stadsdelar"
		data={districtToSelectItemGroups(districts)}
		value={value}
		onChange={onChange}
		searchable
		clearable
		style={style}
	/>
);
