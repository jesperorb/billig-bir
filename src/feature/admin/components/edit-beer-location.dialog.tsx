import { Modal, Button, Group, Text, Drawer } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { commonBaseQueryKeys, useDistricts } from "@common/api/queries";
import { BeerLocationForm } from "@common/components/beer-location.form";
import type {
	AWStartAndEndTimesFormData,
	BeerLocationFormData,
} from "@common/types/beer-location-form-data";

import {
	useDeleteAwTime,
	useDeleteBeerLocation,
	useUpdateBeerLocation,
} from "../queries";

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
			queryKey: [commonBaseQueryKeys.getBeerLocations],
		});
	};

	const onSubmit = async (value: BeerLocationFormData) => {
		await mutation.mutateAsync(value);
		invalidateBeerLocations();
		onClose();
	};

	const onRemoveAwTime = async (awTime: AWStartAndEndTimesFormData) => {
		await awTimeDeleteMutation.mutateAsync(awTime);
	};

	const onDeleteLocation = async () => {
		if (!location) return;

		await deleteMutation.mutateAsync(location);
		invalidateBeerLocations();
		setDeleteConfirmOpen(false);
		onClose();
	};

	return (
		<>
			<Drawer
				opened={open}
				onClose={onClose}
				title={`Redigera ${location?.name ?? ""}`}
				size="xl"
			>
				{location && (
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
				)}
				<Group justify="space-between" mt="md">
					<Button
						color="red"
						variant="filled"
						onClick={() => {
							setDeleteConfirmOpen(true);
						}}
						loading={deleteMutation.isPending}
					>
						Ta bort plats
					</Button>
				</Group>
			</Drawer>

			<Modal
				opened={deleteConfirmOpen}
				onClose={() => {
					setDeleteConfirmOpen(false);
				}}
				title="Bekräfta borttagning"
				size="sm"
			>
				<Text mb="md">
					Är du säker på att du vill ta bort "{location?.name}"? Denna åtgärd
					kan inte ångras.
				</Text>
				<Group justify="flex-end">
					<Button
						variant="default"
						onClick={() => {
							setDeleteConfirmOpen(false);
						}}
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
	);
};
