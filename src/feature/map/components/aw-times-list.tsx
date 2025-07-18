import { Divider, List, Text } from "@mantine/core";

import { WEEKDAY_NAMES } from "@common/constants";
import { type AWStartAndEndTimes } from "@common/types/beer-location";

interface Props {
	times: AWStartAndEndTimes[] | undefined;
}

export const AwTimesList = ({ times }: Props) => {
	if (!times) return null;
	if (!times.length) return null;
	if (times.some((time) => time.sameTimesAllWeek)) {
		return (
			<>
				<Divider />
				<Text fw={700}>AW-tider</Text>
				<List mb="sm">
					<List.Item>
						Alla dagar: {times[0]?.startTime}–{times[0]?.endTime}
					</List.Item>
				</List>
			</>
		);
	}
	return (
		<>
			<Divider />
			<Text fw={700}>AW-tider</Text>
			<List mb="sm">
				{times.map((time) => (
					<List.Item key={time.weekday}>
						{WEEKDAY_NAMES[time.weekday as keyof typeof WEEKDAY_NAMES]}:{" "}
						{time.startTime}–{time.endTime}
					</List.Item>
				))}
			</List>
		</>
	);
};
