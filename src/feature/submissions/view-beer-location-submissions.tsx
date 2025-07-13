import { ActionIcon, AppShell, Button, Divider, Group, Table, ThemeIcon, Title } from "@mantine/core";
import { IconCheck, IconReload, IconX, IconEye } from "@tabler/icons-react";
import { useState } from "react";
import { BeerLocation } from "@common/types/beer-location";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useBeerLocationSubmissions, createBeerLocationSubmissionQueryKeys } from "./queries";
import { ViewBeerLocationSubmissionDialog } from "./view-beer-location-submission.dialog";

export const ViewBeerLocationSubmissions = () => {
	const queryClient = useQueryClient();
	const { data, isLoading } = useBeerLocationSubmissions();
	const [modalOpened, { open, close }] = useDisclosure(false);
	const [submissionToView, setSubmissionToView] = useState<BeerLocation | undefined>(undefined);

	return (
		<AppShell.Main>
			<Group justify="space-between" p="sm">
				<Title order={2} p="md">
					Platsförslag
				</Title>
				<Button
					loading={isLoading}
					rightSection={<IconReload />}
					onClick={() => {
						queryClient.invalidateQueries({
							queryKey: createBeerLocationSubmissionQueryKeys.getBeerLocationSubmissions
						})
					}}
				>
					Ladda om
				</Button>
			</Group>
			<Divider />
			<Table.ScrollContainer minWidth={500}>
				<Table
					stickyHeader
					striped
					highlightOnHover
					tabularNums
					withColumnBorders
				>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Namn</Table.Th>
							<Table.Th>Ölmärke</Table.Th>
							<Table.Th>Pris</Table.Th>
							<Table.Th>cl</Table.Th>
							<Table.Th>Pris (AW)</Table.Th>
							<Table.Th>cl (AW)</Table.Th>
							<Table.Th>Pris (kanna)</Table.Th>
							<Table.Th>cl (kanna)</Table.Th>
							<Table.Th>Uteservering</Table.Th>
							<Table.Th>Eftermiddagssol</Table.Th>
							<Table.Th>AW-tider</Table.Th>
							<Table.Th>Latitude</Table.Th>
							<Table.Th>Longitude</Table.Th>
							<Table.Th>Visa</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{data?.map((submission, index) => (
							<Table.Tr key={index}>
								<Table.Td>{submission.name}</Table.Td>
								<Table.Td>{submission.beerBrand}</Table.Td>
								<Table.Td>{submission.price}</Table.Td>
								<Table.Td>{submission.centilitersStandard}</Table.Td>
								<Table.Td>{submission.priceAW ? submission.priceAW : "-"}</Table.Td>
								<Table.Td>{submission.centilitersStandard}</Table.Td>
								<Table.Td>{submission.pricePitcher ? submission.pricePitcher : "-"}</Table.Td>
								<Table.Td>{submission.centilitersPitcher ? submission.centilitersPitcher : "-"}</Table.Td>
								<Table.Td>
									{submission.outdoorSeating
										? <ThemeIcon size="xs"><IconCheck /></ThemeIcon>
										: <ThemeIcon color="red" size="xs"><IconX /></ThemeIcon>
									}
								</Table.Td>
								<Table.Td>{
									submission.afternoonSun
									? <ThemeIcon size="xs"><IconCheck /></ThemeIcon>
									: <ThemeIcon color="red" size="xs"><IconX /></ThemeIcon>
								}
								</Table.Td>
								<Table.Td>{
									submission.awTimes?.length
									?<ThemeIcon size="xs"><IconCheck /></ThemeIcon>
									: <ThemeIcon color="red" size="xs"><IconX /></ThemeIcon>
								}
								</Table.Td>
								<Table.Td>{submission.latitude}</Table.Td>
								<Table.Td>{submission.longitude}</Table.Td>
								<Table.Td>
									<ActionIcon
										onClick={() => {
											setSubmissionToView(submission);
											open();
										}}
										p={0}
										variant="subtle"
										size="sm"
										aria-label={`Visa ${submission.name}`}
									>
										<IconEye />
									</ActionIcon>
								</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
			<ViewBeerLocationSubmissionDialog
				submission={submissionToView}
				open={modalOpened}
				onClose={close}
			/>
		</AppShell.Main>
	);
};
