import { Drawer } from "@mantine/core";

import { useDistricts } from "@common/api/queries";
import { BeerLocationForm } from "@common/components/beer-location.form";
import { useNotification } from "@common/notifications/use-notification";
import type { BeerLocationFormData } from "@common/types/beer-location-form-data";

import { useCreateBeerLocationSubmission } from "./queries";

interface Props {
	onClose: () => void;
}

const BeerLocationSubmissionDialogContent = ({ onClose }: Props) => {
	const mutation = useCreateBeerLocationSubmission();
	const { data: districts } = useDistricts();
	const showNotification = useNotification();

	const onSubmit = async (data: BeerLocationFormData) => {
		try {
			await mutation.mutateAsync(data);
			showNotification(
				"success",
				"Förslag skickat",
				"Ditt förslag på en ny plats har skickats in för granskning",
			);
			onClose();
		} catch (e) {
			console.error(e);
			showNotification(
				"error",
				"Något gick fel",
				"Försök igen eller kontakta en katt om problemet kvarstår",
			);
		}
	};

	return (
		<Drawer opened onClose={onClose} title="Föreslå ny plats" size="xl">
			<BeerLocationForm
				loading={mutation.isPending}
				submitButtonText="Skicka"
				showClearButton={true}
				onSubmit={onSubmit}
				districts={districts ?? undefined}
			/>
		</Drawer>
	);
};

export default BeerLocationSubmissionDialogContent;
