import { Modal, Title, Group, Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import type { District } from "@common/types/district";
import { DistrictForm } from "./district-form";

interface EditDistrictDialogProps {
	opened: boolean;
	district: District | null;
	loading?: boolean;
	deleteLoading?: boolean;
	onSubmit: (data: District) => Promise<void>;
	onDelete?: (district: District) => Promise<void>;
	onClose: () => void;
}

export const EditDistrictDialog = ({
	opened,
	onClose,
	district,
	onSubmit,
	onDelete,
	loading = false,
	deleteLoading = false,
}: EditDistrictDialogProps) => {
	const handleSubmit = async (data: District) => {
		if (!district) return;
		await onSubmit(data);
		onClose();
	};

	const handleDelete = async () => {
		if (!district || !onDelete) return;
		await onDelete(district);
		onClose();
	};

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title={<Title order={3}>Redigera stadsdel</Title>}
			size="md"
		>
			<DistrictForm
				defaultValues={district || undefined}
				loading={loading}
				onSubmit={handleSubmit}
				onCancel={onClose}
			/>
			{onDelete && (
				<Group justify="flex-start" mt="md" pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
					<Button
						color="red"
						variant="outline"
						leftSection={<IconTrash size={16} />}
						onClick={handleDelete}
						loading={deleteLoading}
						disabled={loading}
					>
						Ta bort stadsdel
					</Button>
				</Group>
			)}
		</Modal>
	);
};
