import { Modal, Button, Group, Text, Title, Stack, Paper, Divider, Badge, Grid, ThemeIcon, Notification } from "@mantine/core";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IconCheck, IconX, IconTrash, IconMapPin, IconClock, IconExternalLink } from "@tabler/icons-react";
import { BeerLocation } from "@common/types/beer-location";
import { useDeleteBeerLocationSubmission, useApproveBeerLocationSubmission, createBeerLocationSubmissionQueryKeys } from "./queries";
import { beerLocationsBaseQueryKeys } from "@feature/map/queries";

interface Props {
	submission: BeerLocation | undefined;
	open: boolean;
	onClose: () => void;
}

type NotificationType = "success" | "error";

export const ViewBeerLocationSubmissionDialog = ({ submission, open, onClose }: Props) => {
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
	const [approveConfirmOpen, setApproveConfirmOpen] = useState(false);
	const [showNotification, setShowNotification] = useState<NotificationType | undefined>(undefined);
	const queryClient = useQueryClient();
	const deleteMutation = useDeleteBeerLocationSubmission();
	const approveMutation = useApproveBeerLocationSubmission();

	const invalidateQueries = () => {
		queryClient.invalidateQueries({
			queryKey: createBeerLocationSubmissionQueryKeys.getBeerLocationSubmissions
		});
		queryClient.invalidateQueries({
			queryKey: [beerLocationsBaseQueryKeys.get]
		});
	};

	const onDeleteSubmission = async () => {
		if (!submission) return;
		try {
			await deleteMutation.mutateAsync(submission);
			invalidateQueries();
			setShowNotification("success");
			onClose();
			setDeleteConfirmOpen(false);
			setTimeout(() => {
				setShowNotification(undefined);
			}, 2000);
		} catch (error) {
			console.error("Error deleting submission:", error);
			setShowNotification("error");
			setTimeout(() => {
				setShowNotification(undefined);
			}, 3000);
		}
	};

	const onApproveSubmission = async () => {
		if (!submission) return;
		try {
			await approveMutation.mutateAsync(submission);
			await deleteMutation.mutateAsync(submission);
			invalidateQueries();
			setShowNotification("success");
			onClose();
			setApproveConfirmOpen(false);
			setTimeout(() => {
				setShowNotification(undefined);
			}, 2000);
		} catch (error) {
			console.error("Error approving submission:", error);
			setShowNotification("error");
			setTimeout(() => {
				setShowNotification(undefined);
			}, 3000);
		}
	};

	if (!submission) return null;

	return (
		<>
			{showNotification && (
				<Notification
					title={showNotification === "success" ? "Åtgärd slutförd!" : "Något gick fel"}
					color={showNotification === "error" ? "red" : "green"}
					styles={{
						root: {
							position: "fixed",
							top: "2rem",
							right: "2rem",
							zIndex: 9999999,
						}
					}}
					withBorder
					withCloseButton
					onClose={() => setShowNotification(undefined)}
					icon={showNotification === "success" ? <IconCheck /> : <IconX />}
				>
					{showNotification === "success" 
						? "Åtgärden har slutförts framgångsrikt"
						: "Försök igen eller kontakta en katt om problemet kvarstår"
					}
				</Notification>
			)}

			<Modal
				opened={open}
				onClose={onClose}
				title={<Title order={2}>Platsförslag: {submission.name}</Title>}
				size="lg"
			>
				<Stack gap="md">
					{/* Basic Information */}
					<Paper p="md" withBorder>
						<Title order={4} mb="sm">Grundinformation</Title>
						<Grid>
							<Grid.Col span={6}>
								<Text size="sm" c="dimmed">Namn</Text>
								<Text fw={500}>{submission.name}</Text>
							</Grid.Col>
							<Grid.Col span={6}>
								<Text size="sm" c="dimmed">Ölmärke</Text>
								<Text fw={500}>{submission.beerBrand || "-"}</Text>
							</Grid.Col>
							<Grid.Col span={4}>
								<Text size="sm" c="dimmed">Standardpris</Text>
								<Text fw={500}>{submission.price ? `${submission.price} kr` : "-"}</Text>
							</Grid.Col>
							<Grid.Col span={4}>
								<Text size="sm" c="dimmed">Centiliter</Text>
								<Text fw={500}>{submission.centilitersStandard ? `${submission.centilitersStandard} cl` : "-"}</Text>
							</Grid.Col>
							<Grid.Col span={4}>
								<Text size="sm" c="dimmed">Uppdaterad</Text>
								<Text fw={500}>{submission.updatedAt ? new Date(submission.updatedAt).toLocaleDateString('sv-SE') : "-"}</Text>
							</Grid.Col>
						</Grid>
					</Paper>

					{/* AW and Pitcher Prices */}
					<Paper p="md" withBorder>
						<Title order={4} mb="sm">Priser</Title>
						<Grid>
							<Grid.Col span={6}>
								<Text size="sm" c="dimmed">AW-pris</Text>
								<Text fw={500}>{submission.priceAW ? `${submission.priceAW} kr` : "-"}</Text>
							</Grid.Col>
							<Grid.Col span={6}>
								<Text size="sm" c="dimmed">Kannapris</Text>
								<Text fw={500}>{submission.pricePitcher ? `${submission.pricePitcher} kr` : "-"}</Text>
							</Grid.Col>
							<Grid.Col span={6}>
								<Text size="sm" c="dimmed">Kanna centiliter</Text>
								<Text fw={500}>{submission.centilitersPitcher ? `${submission.centilitersPitcher} cl` : "-"}</Text>
							</Grid.Col>
						</Grid>
					</Paper>

					{/* Features */}
					<Paper p="md" withBorder>
						<Title order={4} mb="sm">Egenskaper</Title>
						<Group gap="sm">
							<Badge
								color={submission.outdoorSeating ? "green" : "gray"}
								leftSection={<ThemeIcon size="xs" variant="transparent">
									{submission.outdoorSeating ? <IconCheck size={12} /> : <IconX size={12} />}
								</ThemeIcon>}
							>
								Uteservering
							</Badge>
							<Badge
								color={submission.afternoonSun ? "green" : "gray"}
								leftSection={<ThemeIcon size="xs" variant="transparent">
									{submission.afternoonSun ? <IconCheck size={12} /> : <IconX size={12} />}
								</ThemeIcon>}
							>
								Eftermiddagssol
							</Badge>
							<Badge
								color={submission.awTimes?.length ? "green" : "gray"}
								leftSection={<ThemeIcon size="xs" variant="transparent">
									{submission.awTimes?.length ? <IconCheck size={12} /> : <IconX size={12} />}
								</ThemeIcon>}
							>
								AW-tider
							</Badge>
						</Group>
					</Paper>

					{/* AW Times */}
					{submission.awTimes && submission.awTimes.length > 0 && (
						<Paper p="md" withBorder>
							<Title order={4} mb="sm" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
								<IconClock size={16} />
								AW-tider
							</Title>
							<Stack gap="xs">
								{submission.awTimes.map((awTime, index) => (
									<Group key={index} justify="space-between">
										<Text size="sm">
											{awTime.sameTimesAllWeek ? "Alla dagar" : `${awTime.weekday || "Okänd dag"}`}
										</Text>
										<Text size="sm" fw={500}>
											{awTime.startTime || "00:00"} - {awTime.endTime || "00:00"}
										</Text>
									</Group>
								))}
							</Stack>
						</Paper>
					)}

					{/* Location */}
					<Paper p="md" withBorder>
						<Title order={4} mb="sm" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
							<IconMapPin size={16} />
							Plats
						</Title>
						<Grid>
							<Grid.Col span={6}>
								<Text size="sm" c="dimmed">Latitude</Text>
								<Text fw={500}>{submission.latitude}</Text>
							</Grid.Col>
							<Grid.Col span={6}>
								<Text size="sm" c="dimmed">Longitude</Text>
								<Text fw={500}>{submission.longitude}</Text>
							</Grid.Col>
						</Grid>
						
						{(submission.urlMaps || submission.urlWebsite) && (
							<>
								<Divider my="sm" />
								<Group gap="sm">
									{submission.urlMaps && (
										<Button
											variant="light"
											size="xs"
											leftSection={<IconExternalLink size={14} />}
											component="a"
											href={submission.urlMaps}
											target="_blank"
										>
											Visa på karta
										</Button>
									)}
									{submission.urlWebsite && (
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
									)}
								</Group>
							</>
						)}
					</Paper>

					{/* Actions */}
					<Group justify="space-between" mt="md">
						<Button
							variant="default"
							onClick={onClose}
						>
							Stäng
						</Button>
						<Group>
							<Button
								color="red"
								leftSection={<IconTrash size={16} />}
								onClick={() => setDeleteConfirmOpen(true)}
								loading={approveMutation.isPending || deleteMutation.isPending}
							>
								Ta bort förslag
							</Button>
							<Button
								color="green"
								leftSection={<IconCheck size={16} />}
								onClick={() => setApproveConfirmOpen(true)}
								loading={approveMutation.isPending || deleteMutation.isPending}
							>
								Godkänn förslag
							</Button>
						</Group>
					</Group>
				</Stack>
			</Modal>

			{/* Delete Confirmation Modal */}
			<Modal
				opened={deleteConfirmOpen}
				onClose={() => setDeleteConfirmOpen(false)}
				title={<Title order={2}>Bekräfta borttagning</Title>}
				size="sm"
			>
				<Text mb="md">
					Är du säker på att du vill ta bort förslaget "{submission.name}"? Denna åtgärd kan inte ångras.
				</Text>
				<Group justify="flex-end">
					<Button
						variant="default"
						onClick={() => setDeleteConfirmOpen(false)}
						disabled={deleteMutation.isPending}
					>
						Avbryt
					</Button>
					<Button
						color="red"
						onClick={onDeleteSubmission}
						loading={deleteMutation.isPending}
					>
						Ta bort
					</Button>
				</Group>
			</Modal>

			{/* Approve Confirmation Modal */}
			<Modal
				opened={approveConfirmOpen}
				onClose={() => setApproveConfirmOpen(false)}
				title={<Title order={2}>Bekräfta godkännande</Title>}
				size="sm"
			>
				<Text mb="md">
					Är du säker på att du vill godkänna förslaget "{submission.name}"? Platsen kommer att läggas till i systemet och förslaget tas bort från kön.
				</Text>
				<Group justify="flex-end">
					<Button
						variant="default"
						onClick={() => setApproveConfirmOpen(false)}
						disabled={approveMutation.isPending || deleteMutation.isPending}
					>
						Avbryt
					</Button>
					<Button
						color="green"
						onClick={onApproveSubmission}
						loading={approveMutation.isPending || deleteMutation.isPending}
					>
						Godkänn
					</Button>
				</Group>
			</Modal>
		</>
	);
};
