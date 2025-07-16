import { AppShell, Title, Button, Group } from "@mantine/core";
import { IconEdit, IconReload, IconPlus } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useDistricts, commonBaseQueryKeys } from "@common/api/queries";
import type { District } from "@common/types/district";

import { CreateDistrictDialog } from "../components/create-district.dialog";
import { DistrictsTable } from "../components/districts-table";
import { EditDistrictDialog } from "../components/edit-district.dialog";
import {
	useUpdateDistrict,
	useCreateDistrict,
	useDeleteDistrict,
} from "../queries";

const ViewDistricts = () => {
	const queryClient = useQueryClient();
	const { data: districts, isLoading } = useDistricts();
	const updateMutation = useUpdateDistrict();
	const createMutation = useCreateDistrict();
	const deleteMutation = useDeleteDistrict();
	const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
		null,
	);
	const [editDialogOpened, setEditDialogOpened] = useState(false);
	const [createDialogOpened, setCreateDialogOpened] = useState(false);

	const handleEditDistrict = (district: District) => {
		setSelectedDistrict(district);
		setEditDialogOpened(true);
	};

	const handleCloseEditDialog = () => {
		setEditDialogOpened(false);
		setSelectedDistrict(null);
	};

	const handleSubmitEdit = async (district: District) => {
		await updateMutation.mutateAsync(district);
		await queryClient.invalidateQueries({
			queryKey: [commonBaseQueryKeys.getDistricts],
		});
		handleCloseEditDialog();
	};

	const handleDeleteDistrict = async (district: District) => {
		await deleteMutation.mutateAsync(district.id);
		await queryClient.invalidateQueries({
			queryKey: [commonBaseQueryKeys.getDistricts],
		});
		handleCloseEditDialog();
	};

	const handleCreateDistrict = async (data: District) => {
		await createMutation.mutateAsync(data);
		await queryClient.invalidateQueries({
			queryKey: [commonBaseQueryKeys.getDistricts],
		});
		setCreateDialogOpened(false);
	};

	if (isLoading) {
		return (
			<AppShell.Main>
				<Title order={2} mb="lg">
					Laddar stadsdelar...
				</Title>
			</AppShell.Main>
		);
	}

	return (
		<>
			<AppShell.Main>
				<Group justify="space-between" p="sm">
					<Title order={2}>Stadsdelar</Title>
					<Group>
						<Button
							leftSection={<IconPlus size={16} />}
							onClick={() => {
								setCreateDialogOpened(true);
							}}
							disabled={isLoading}
						>
							Skapa stadsdel
						</Button>
						<Button
							loading={isLoading}
							rightSection={<IconReload />}
							onClick={() => {
								queryClient.invalidateQueries({
									queryKey: [commonBaseQueryKeys.getDistricts],
								});
							}}
						>
							Ladda om
						</Button>
					</Group>
				</Group>
				<DistrictsTable
					data={districts ?? undefined}
					actionColumn={{
						header: "Redigera",
						icon: <IconEdit size={16} />,
						onClick: handleEditDistrict,
						ariaLabel: (district) => `Redigera ${district.name}`,
					}}
				/>
			</AppShell.Main>
			<EditDistrictDialog
				opened={editDialogOpened}
				onClose={handleCloseEditDialog}
				district={selectedDistrict}
				onSubmit={handleSubmitEdit}
				onDelete={handleDeleteDistrict}
				loading={updateMutation.isPending}
				deleteLoading={deleteMutation.isPending}
			/>
			<CreateDistrictDialog
				opened={createDialogOpened}
				onClose={() => {
					setCreateDialogOpened(false);
				}}
				onSubmit={handleCreateDistrict}
				loading={createMutation.isPending}
			/>
		</>
	);
};

export default ViewDistricts;
