import { AppShell } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useDistricts, commonBaseQueryKeys } from "@common/api/queries";
import { TableWrapper } from "@common/components/table/table-wrapper";
import type { District } from "@common/types/district";

import { CreateDistrictDialog } from "../components/create-district.dialog";
import { DistrictsTable } from "../components/districts-table/districts-table";
import { EditDistrictDialog } from "../components/edit-district.dialog";
import { PageHeader } from "../components/page-header";
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

	const invalidate = async () => {
		await queryClient.invalidateQueries({
			queryKey: [commonBaseQueryKeys.getDistricts],
		});
	};

	const handleSubmitEdit = async (district: District) => {
		await updateMutation.mutateAsync(district);
		await invalidate();
		handleCloseEditDialog();
	};

	const handleDeleteDistrict = async (district: District) => {
		await deleteMutation.mutateAsync(district.id);
		await invalidate();
		handleCloseEditDialog();
	};

	const handleCreateDistrict = async (data: District) => {
		await createMutation.mutateAsync(data);
		await invalidate();
		setCreateDialogOpened(false);
	};

	return (
		<>
			<AppShell.Main>
				<TableWrapper
					header={
						<PageHeader
							title="Stadsdelar"
							onAdd={() => {
								setCreateDialogOpened(true);
							}}
							onReload={invalidate}
							isLoading={isLoading}
						/>
					}
				>
					<DistrictsTable
						data={districts ?? undefined}
						isLoading={isLoading}
						actionColumn={{
							header: "Visa",
							icon: <IconEye size={16} />,
							onClick: handleEditDistrict,
							ariaLabel: (district) => `Redigera ${district.name}`,
						}}
					/>
				</TableWrapper>
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
