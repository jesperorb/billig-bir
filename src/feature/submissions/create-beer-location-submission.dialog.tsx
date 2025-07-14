import { Modal, Title, Notification, Button } from "@mantine/core";
import { useState } from "react";
import { IconBeer, IconCheck } from "@tabler/icons-react";
import { useCreateBeerLocationSubmission } from "./queries";
import { BeerLocationForm } from "@common/components/beer-location.form";
import type { BeerLocationFormData } from "@common/types/beer-location-form-data";
import type { NotificationType } from "@common/types/common";
import { useDistricts } from "@common/api/queries";

export const BeerLocationSubmissionDialog = () => {
	const [open, setOpen] = useState(false);
	const mutation = useCreateBeerLocationSubmission();
	const { data: districts} = useDistricts();
	const [showNotification, setShowNotification] = useState<NotificationType | undefined>(undefined);

	const onSubmit = async (data: BeerLocationFormData) => {
		try {
			await mutation.mutateAsync(data);
			setShowNotification("success");
			setOpen(false);
			setTimeout(() => {
				setShowNotification(undefined);
			}, 2000);
		} catch (e) {
			console.error(e);
			setShowNotification("error");
			setTimeout(() => {
				setShowNotification(undefined);
			}, 3000);
		}
	};

	return (
		<>
			<Button
				leftSection={<IconBeer size={16} />}
				onClick={() => setOpen(true)}
			>
				Föreslå ny plats
			</Button>

			{showNotification && (
				<Notification
					title={showNotification === "success" ? "Förslag skickat!" : "Något gick fel"}
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
					icon={<IconCheck />}
				>
					{showNotification === "success" 
						? "Ditt förslag på ny plats har skickats för granskning"
						: "Försök igen eller kontakta en katt om problemet kvarstår"
					}
				</Notification>
			)}
			
			<Modal
				opened={open}
				onClose={() => setOpen(false)}
				title={<Title order={2}>Föreslå ny plats</Title>}
				size="auto"
			>
				<BeerLocationForm
					loading={mutation.isPending}
					submitButtonText="Skicka"
					showClearButton={true}
					onSubmit={onSubmit}
					districts={districts ?? undefined}
				/>
			</Modal>
		</>
	);
};
