import { Modal } from "@mantine/core";
import type { AWStartAndEndTimesFormData, BeerLocationFormData } from "../types"
import { BeerLocationForm } from "./beer-location.form";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteAwTime, useUpdateBeerLocation } from "../queries";
import { beerLocationsBaseQueryKeys } from "@feature/map/queries";

interface Props {
	location: BeerLocationFormData | undefined;
	isLoading: boolean;
	open: boolean;
	onClose: () => void;
}

export const EditBeerLocationDialog = ({
	location,
	isLoading,
	open,
	onClose,
}: Props) => {
	const queryClient = useQueryClient();
	const mutation = useUpdateBeerLocation();
	const awTimeDeleteMutation = useDeleteAwTime();

	const invalidateBeerLocations = () => {
		queryClient.invalidateQueries({
			queryKey: [beerLocationsBaseQueryKeys.get]
		})
	}

	const onSubmit = async (value: BeerLocationFormData) => {
		await mutation.mutateAsync(value)
		invalidateBeerLocations();
		onClose();
	}

	const onRemoveAwTime = async (awTime: AWStartAndEndTimesFormData) => {
		await awTimeDeleteMutation.mutateAsync(awTime);
	}

	return (
		<Modal opened={open} onClose={onClose} title={`Redigera ${location?.name ?? ""}`} size="auto">
			{location &&
				<BeerLocationForm
					loading={isLoading}
					showClearButton={false}
					defaultValues={{
						...location,
					}}
					onRemoveAwTime={onRemoveAwTime}
					onSubmit={onSubmit}
				/>
			}
		</Modal>
	)
}
