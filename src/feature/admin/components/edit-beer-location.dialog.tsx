import { Modal, Button, Group, Text, Title } from "@mantine/core";
import { useState } from "react";
import type { AWStartAndEndTimesFormData, BeerLocationFormData } from "@common/types/beer-location-form-data"
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteAwTime, useDeleteBeerLocation, useUpdateBeerLocation } from "../queries";
import { beerLocationsBaseQueryKeys } from "@feature/map/queries";
import { BeerLocationForm } from "@common/components/beer-location.form";
import { useDistricts } from "@common/api/queries";

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
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
	const queryClient = useQueryClient();
	const mutation = useUpdateBeerLocation();
	const deleteMutation = useDeleteBeerLocation();
	const awTimeDeleteMutation = useDeleteAwTime();
	const { data: districts } = useDistricts();

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

	const onDeleteLocation = async () => {
		if (!location) return;

		await deleteMutation.mutateAsync(location);
		invalidateBeerLocations();
		setDeleteConfirmOpen(false);
		onClose();
	}

	return (
		<>
			<Modal
				opened={open}
				onClose={onClose}
				title={<Title order={2}>{`Redigera ${location?.name ?? ""}`}</Title>}
				size="auto"
			>
				{location &&
					<BeerLocationForm
						loading={isLoading}
						showClearButton={false}
						defaultValues={{
							...location,
						}}
						onRemoveAwTime={onRemoveAwTime}
						onSubmit={onSubmit}
						districts={districts ?? undefined}
					/>
				}
				<Group justify="space-between" mt="md">
					<Button
						color="red"
						variant="filled"
						onClick={() => setDeleteConfirmOpen(true)}
						loading={deleteMutation.isPending}
					>
						Ta bort plats
					</Button>
				</Group>
			</Modal>

			<Modal
				opened={deleteConfirmOpen}
				onClose={() => setDeleteConfirmOpen(false)}
				title={<Title order={2}>Bekräfta borttagning</Title>}
				size="sm"
			>
				<Text mb="md">
					Är du säker på att du vill ta bort "{location?.name}"? Denna åtgärd kan inte ångras.
				</Text>
				<Group justify="flex-end">
					<Button
						variant="default"
						onClick={() => setDeleteConfirmOpen(false)}
					>
						Avbryt
					</Button>
					<Button
						color="red"
						onClick={onDeleteLocation}
						loading={deleteMutation.isPending}
					>
						Ta bort
					</Button>
				</Group>
			</Modal>
		</>
	)
}
