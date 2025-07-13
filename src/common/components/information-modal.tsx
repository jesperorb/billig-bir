import { useApiClient } from "@common/api/api-client-context";
import { useSession } from "@common/api/use-session";
import { BeerLocationSubmissionDialog } from "@feature/submissions/create-beer-location-submission.dialog";
import { Modal, ActionIcon, Button, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandGithub, IconExternalLink, IconQuestionMark, IconSettings } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";

export const InformationModal = () => {
	const [modalOpened, { open, close }] = useDisclosure(false);
	const navigate = useNavigate();
	const session = useSession();
	const apiClient = useApiClient();

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
				<Stack gap="md">
					<BeerLocationSubmissionDialog />
					<Button
						onClick={() => {
							navigate({ to: "/admin" })
							close()
						}}
						leftSection={<IconSettings />}
					>
						Administrera
					</Button>
					{Boolean(session?.user) && (
						<Button
							onClick={async () => {
								await apiClient.auth.signOut();
								navigate({ to: "/" })
								close();
							}}
						>
							Logga ut
						</Button>
					)}
					<Button
						component="a"
						href="https://github.com/jesperorb/billig-bir"
						leftSection={<IconBrandGithub />}
						rightSection={<IconExternalLink />}
						onClick={close}
					>
						GitHub
					</Button>
				</Stack>
			</Modal>
		</>
	);
};
