import { type MantineStyleProp, MultiSelect } from "@mantine/core";

import { District } from "@common/types/district";
import { districtToSelectItemGroups } from "@common/utils/district";

interface Props {
	value: string[];
	districts: District[];
	onChange: (value: string[]) => void;
	style?: MantineStyleProp;
	error?: string;
	defaultValue?: string[];
	placeholder?: string;
}

const defaultStyle = { flexGrow: 1, minWidth: 200 };

export const DistrictSelect = ({
	value,
	defaultValue,
	districts,
	onChange,
	error,
	placeholder,
	style = defaultStyle,
}: Props) => (
	<MultiSelect
		label="Stadsdelar"
		placeholder={placeholder ?? "Filtrera på stadsdelar"}
		data={districtToSelectItemGroups(districts)}
		defaultValue={defaultValue}
		value={value}
		onChange={onChange}
		searchable
		clearable
		style={style}
		error={error}
	/>
);
