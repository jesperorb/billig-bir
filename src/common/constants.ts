export const WEEKDAY_NAMES = {
	0: "Måndag",
	1: "Tisdag",
	2: "Onsdag",
	3: "Torsdag",
	4: "Fredag",
	5: "Lördag",
	6: "Söndag",
} as const;

export const WEEKDAY_NAMES_AS_LIST = Object.entries(WEEKDAY_NAMES).map(
	([key, value]) => ({ value: key, label: value }),
);
