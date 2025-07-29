import {
	Modal,
	Button,
	Group,
	Text,
	Title,
	Stack,
	Paper,
	Divider,
	Badge,
	Grid,
	ThemeIcon,
	Drawer,
} from "@mantine/core";
import {
	IconCheck,
	IconX,
	IconTrash,
	IconMapPin,
	IconClock,
	IconExternalLink,
	IconCurrencyKroneSwedish,
	IconAdjustments,
	IconInfoCircle,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { commonBaseQueryKeys } from "@common/api/queries";
import { WEEKDAY_NAMES } from "@common/constants";
import { useNotification } from "@common/notifications/use-notification";
import type { BeerLocation } from "@common/types/beer-location";

import {
	useDeleteBeerLocationSubmission,
	useApproveBeerLocationSubmission,
	createBeerLocationSubmissionQueryKeys,
} from "./queries";

interface Props {
	submission: BeerLocation | undefined;
	open: boolean;
	onClose: () => void;
}

export const ViewBeerLocationSubmissionDialog = ({
	submission,
	open,
	onClose,
}: Props) => {
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
	const [approveConfirmOpen, setApproveConfirmOpen] = useState(false);
	const showNotification = useNotification();
	const queryClient = useQueryClient();
	const deleteMutation = useDeleteBeerLocationSubmission();
	const approveMutation = useApproveBeerLocationSubmission();

	const invalidateQueries = () => {
		queryClient.invalidateQueries({
			queryKey:
				createBeerLocationSubmissionQueryKeys.getBeerLocationSubmissions,
		});
		queryClient.invalidateQueries({
			queryKey: [commonBaseQueryKeys.getBeerLocations],
		});
	};

	const onDeleteSubmission = async () => {
		if (!submission) return;
		try {
			await deleteMutation.mutateAsync(submission);
			invalidateQueries();
			showNotification(
				"success",
				"Platsförlag borttaget",
				"Platsförslaget har tagits bort",
			);
			onClose();
			setDeleteConfirmOpen(false);
		} catch (error) {
			console.error("Error deleting submission:", error);
			showNotification(
				"error",
				"Något gick fel",
				"Försök igen eller kontakta en katt om problemet kvarstår",
			);
		}
	};

	const onApproveSubmission = async () => {
		if (!submission) return;
		try {
			await approveMutation.mutateAsync(submission);
			await deleteMutation.mutateAsync(submission);
			invalidateQueries();
			showNotification(
				"success",
				"Platsförslaget godkänt",
				"Förslaget har godkänts och platsen har lagts till",
			);
			onClose();
			setApproveConfirmOpen(false);
		} catch (error) {
			console.error("Error approving submission:", error);
			showNotification(
				"error",
				"Något gick fel",
				"Försök igen eller kontakta en katt om problemet kvarstår",
			);
		}
	};

	if (!submission) return null;

	return (
		<>
			<Drawer
				opened={open}
				onClose={onClose}
				title={`Platsförslag: ${submission.name}`}
				size="lg"
			>
				<Stack gap="md">
					<Paper p="md" withBorder>
						<Title
							order={4}
							mb="sm"
							style={{ display: "flex", alignItems: "center", gap: "8px" }}
						>
							<IconInfoCircle size={16} />
							Grundinformation
						</Title>
						<Grid>
							<Grid.Col span={6}>
								<Text size="sm" c="dimmed">
									Namn
								</Text>
								<Text fw={500}>{submission.name}</Text>
							</Grid.Col>
							<Grid.Col span={6}>
								<Text size="sm" c="dimmed">
									Ölmärke
								</Text>
								<Text fw={500}>{submission.beerBrand || "-"}</Text>
							</Grid.Col>
						</Grid>
					</Paper>

					<Paper p="md" withBorder>
						<Title
							order={4}
							mb="sm"
							style={{ display: "flex", alignItems: "center", gap: "8px" }}
						>
							<IconCurrencyKroneSwedish size={16} />
							Priser
						</Title>
						<Stack gap="sm">
							<Group justify="space-between" align="center">
								<Text size="sm" c="dimmed">
									Pris
								</Text>
								<Text fw={500}>
									{submission.price && submission.centilitersStandard
										? `${submission.price.toString()} kr / ${submission.centilitersStandard.toString()} cl`
										: "-"}
								</Text>
							</Group>

							<Group justify="space-between" align="center">
								<Text size="sm" c="dimmed">
									AW-pris
								</Text>
								<Text fw={500}>
									{submission.priceAW && submission.centilitersStandard
										? `${submission.priceAW.toString()} kr / ${submission.centilitersStandard.toString()} cl`
										: "-"}
								</Text>
							</Group>

							<Group justify="space-between" align="center">
								<Text size="sm" c="dimmed">
									Kannapris
								</Text>
								<Text fw={500}>
									{submission.pricePitcher && submission.centilitersPitcher
										? `${submission.pricePitcher.toString()} kr / ${submission.centilitersPitcher.toString()} cl`
										: "-"}
								</Text>
							</Group>
						</Stack>
					</Paper>

					{/* Features */}
					<Paper p="md" withBorder>
						<Title
							order={4}
							mb="sm"
							style={{ display: "flex", alignItems: "center", gap: "8px" }}
						>
							<IconAdjustments size={16} />
							Egenskaper
						</Title>
						<Group gap="sm">
							<Badge
								color={submission.outdoorSeating ? "teal" : "dark"}
								variant="light"
								leftSection={
									<ThemeIcon size="xs" variant="transparent">
										{submission.outdoorSeating ? (
											<IconCheck size={12} color="white" />
										) : (
											<IconX size={12} color="red" />
										)}
									</ThemeIcon>
								}
							>
								Uteservering
							</Badge>
							<Badge
								color={submission.afternoonSun ? "teal" : "dark"}
								variant="light"
								leftSection={
									<ThemeIcon size="xs" variant="transparent">
										{submission.afternoonSun ? (
											<IconCheck size={12} color="white" />
										) : (
											<IconX size={12} color="red" />
										)}
									</ThemeIcon>
								}
							>
								Eftermiddagssol
							</Badge>
							<Badge
								color={submission.awTimes?.length ? "green" : "dark"}
								variant="light"
								leftSection={
									<ThemeIcon size="xs" variant="transparent">
										{submission.awTimes?.length ? (
											<IconCheck size={12} />
										) : (
											<IconX size={12} color="red" />
										)}
									</ThemeIcon>
								}
							>
								AW-tider
							</Badge>
						</Group>
					</Paper>

					{/* AW Times */}
					{submission.awTimes && submission.awTimes.length > 0 && (
						<Paper p="md" withBorder>
							<Title
								order={4}
								mb="sm"
								style={{ display: "flex", alignItems: "center", gap: "8px" }}
							>
								<IconClock size={16} />
								AW-tider
							</Title>
							<Stack gap="xs">
								{submission.awTimes.map((awTime) => (
									<Group key={awTime.id} justify="space-between">
										<Text size="sm">
											{awTime.sameTimesAllWeek
												? "Alla dagar"
												: WEEKDAY_NAMES[
														awTime.weekday as keyof typeof WEEKDAY_NAMES
													]}
										</Text>
										<Text size="sm" fw={500}>
											{awTime.startTime} - {awTime.endTime}
										</Text>
									</Group>
								))}
							</Stack>
						</Paper>
					)}

					<Paper p="md" withBorder>
						<Title
							order={4}
							mb="sm"
							style={{ display: "flex", alignItems: "center", gap: "8px" }}
						>
							<IconMapPin size={16} />
							Plats
						</Title>
						<Grid>
							<Grid.Col span={6}>
								<Text size="sm" c="dimmed">
									Latitude
								</Text>
								<Text fw={500}>{submission.latitude}</Text>
							</Grid.Col>
							<Grid.Col span={6}>
								<Text size="sm" c="dimmed">
									Longitude
								</Text>
								<Text fw={500}>{submission.longitude}</Text>
							</Grid.Col>
						</Grid>

						{(submission.urlMaps ?? submission.urlWebsite) && (
							<>
								<Divider my="sm" />
								<Stack gap="sm">
									{submission.urlMaps && (
										<Group justify="space-between" align="center">
											<Button
												variant="light"
												size="xs"
												leftSection={<IconExternalLink size={14} />}
												component="a"
												href={submission.urlMaps}
												target="_blank"
											>
												Visa på Google Maps
											</Button>
											<Text
												size="xs"
												c="dimmed"
												style={{ wordBreak: "break-all", maxWidth: "60%" }}
											>
												{submission.urlMaps}
											</Text>
										</Group>
									)}
									{submission.urlWebsite && (
										<Group justify="space-between" align="center">
											<Button
												variant="light"
												size="xs"
												leftSection={<IconExternalLink size={14} />}
												component="a"
												href={submission.urlWebsite}
												target="_blank"
											>
												Webbplats
											</Button>
											<Text
												size="xs"
												c="dimmed"
												style={{ wordBreak: "break-all", maxWidth: "60%" }}
											>
												{submission.urlWebsite}
											</Text>
										</Group>
									)}
								</Stack>
							</>
						)}
					</Paper>

					{submission.updatedAt && (
						<Paper p="md" withBorder>
							<Group>
								<Text size="sm" c="dimmed">
									Senast uppdaterad
								</Text>
								<Text fw={500}>
									{submission.updatedAt
										? new Date(submission.updatedAt).toLocaleDateString("sv-SE")
										: "-"}
								</Text>
							</Group>
						</Paper>
					)}

					<Group justify="space-between" mt="md">
						<Button variant="default" onClick={onClose}>
							Stäng
						</Button>
						<Group>
							<Button
								color="red"
								leftSection={<IconTrash size={16} />}
								onClick={() => {
									setDeleteConfirmOpen(true);
								}}
								loading={approveMutation.isPending || deleteMutation.isPending}
							>
								Ta bort förslag
							</Button>
							<Button
								color="green"
								leftSection={<IconCheck size={16} />}
								onClick={() => {
									setApproveConfirmOpen(true);
								}}
								loading={approveMutation.isPending || deleteMutation.isPending}
							>
								Godkänn förslag
							</Button>
						</Group>
					</Group>
				</Stack>
			</Drawer>

			{/* Delete Confirmation Modal */}
			<Modal
				opened={deleteConfirmOpen}
				onClose={() => {
					setDeleteConfirmOpen(false);
				}}
				title="Bekräfta borttagning"
				size="sm"
			>
				<Text mb="md">
					Är du säker på att du vill ta bort förslaget "{submission.name}"?
					Denna åtgärd kan inte ångras.
				</Text>
				<Group justify="flex-end">
					<Button
						variant="default"
						onClick={() => {
							setDeleteConfirmOpen(false);
						}}
						disabled={deleteMutation.isPending}
					>
						Avbryt
					</Button>
					<Button
						color="red"
						onClick={() => {
							onDeleteSubmission();
						}}
						loading={deleteMutation.isPending}
					>
						Ta bort
					</Button>
				</Group>
			</Modal>

			{/* Approve Confirmation Modal */}
			<Modal
				opened={approveConfirmOpen}
				onClose={() => {
					setApproveConfirmOpen(false);
				}}
				title="Bekräfta godkännande"
				size="sm"
			>
				<Text mb="md">
					Är du säker på att du vill godkänna förslaget "{submission.name}"?
					Platsen kommer att läggas till i systemet och förslaget tas bort från
					kön.
				</Text>
				<Group justify="flex-end">
					<Button
						variant="default"
						onClick={() => {
							setApproveConfirmOpen(false);
						}}
						disabled={approveMutation.isPending || deleteMutation.isPending}
					>
						Avbryt
					</Button>
					<Button
						color="green"
						onClick={() => {
							onApproveSubmission();
						}}
						loading={approveMutation.isPending || deleteMutation.isPending}
					>
						Godkänn
					</Button>
				</Group>
			</Modal>
		</>
	);
};
