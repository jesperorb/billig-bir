import { Modal, Text, ActionIcon, Anchor as MantineAnchor } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconQuestionMark } from "@tabler/icons-react";
import { Anchor } from "./anchor";

export const InformationModal = () => {
	const [modalOpened, { open, close }] = useDisclosure(false);

	return (
		<>
			<ActionIcon
				variant="filled"
				size="xl"
				aria-label="Information"
				onClick={open}
			>
				<IconQuestionMark />
			</ActionIcon>
			<Modal opened={modalOpened} onClose={close} title="Information">
				<Text>
					GitHub:{" "}
					<MantineAnchor
						href="https://github.com/jesperorb/billig-bir"
						target="_blank"
					>
						https://github.com/jesperorb/billig-bir
					</MantineAnchor>
				</Text>

				<Anchor to="/admin">Admin</Anchor>
			</Modal>
		</>
	);
};
