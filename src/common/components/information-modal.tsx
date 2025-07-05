import { Modal, Anchor, Text, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconQuestionMark } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

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
					<Anchor
						href="https://github.com/jesperorb/billig-bir"
						target="_blank"
					>
						https://github.com/jesperorb/billig-bir
					</Anchor>
				</Text>

				<Link onClick={() => close()} to="/admin">Admin</Link>
			</Modal>
		</>
	);
};
