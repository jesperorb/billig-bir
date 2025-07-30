import { Drawer } from "@mantine/core";

import type { District } from "@common/types/district";

import { DistrictForm } from "./district-form";

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
		<Drawer
			opened={opened}
			onClose={onClose}
			title="Skapa ny stadsdel"
			size="xl"
		>
			<DistrictForm
				loading={loading}
				submitButtonText="Skapa"
				onSubmit={handleSubmit}
				onCancel={onClose}
			/>
		</Drawer>
	);
};
