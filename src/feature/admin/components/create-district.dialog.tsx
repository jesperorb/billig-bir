import { Modal, Title } from "@mantine/core";
import { DistrictForm } from "./district-form";
import type { District } from "@common/types/district";

interface CreateDistrictDialogProps {
	opened: boolean;
	loading?: boolean;
	onSubmit: (data: District) => Promise<void>;
	onClose: () => void;
}

export const CreateDistrictDialog = ({
	opened,
	onClose,
	onSubmit,
	loading = false,
}: CreateDistrictDialogProps) => {
	const handleSubmit = async (data: District) => {
		await onSubmit(data);
		onClose();
	};

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title={<Title order={3}>Skapa ny stadsdel</Title>}
			size="md"
		>
			<DistrictForm
				loading={loading}
				submitButtonText="Skapa"
				onSubmit={handleSubmit}
				onCancel={onClose}
			/>
		</Modal>
	);
};
