export const removeEmptyStrings = <Type extends object>(
	values: Type,
): Type =>
	Object.fromEntries(
		Object.entries(values).map(([key, value]) => [
			key,
			value === "" ? undefined : value,
		]),
	) as Type;
