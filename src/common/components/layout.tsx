import { type PropsWithChildren } from "react";
import {
	AppShell,
	Burger,
	Flex,
	Group,
	Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { ThemeToggle } from "@common/theme/ThemeToggle";
import { InformationModal } from "@common/components/information-modal";
import { useNavigate } from "@tanstack/react-router";

const AppWrapper = ({ children }: PropsWithChildren) => {
	const [menuOpen, { toggle }] = useDisclosure();
	const navigate = useNavigate();
	return (
		<AppShell
			header={{ height: 70 }}
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { mobile: !menuOpen },
			}}
		>
			<AppShell.Header>
				<Flex justify="space-between" align="center">
					<Group h="100%" p="sm">
						<Burger
							opened={menuOpen}
							onClick={toggle}
							hiddenFrom="sm"
							size="sm"
						/>
						<Title onClick={() => navigate({ to: "/" })} order={1}>Billig bir</Title>
					</Group>
					<Group h="100%" p="xs">
						<ThemeToggle />
						<InformationModal />
					</Group>
				</Flex>
			</AppShell.Header>
			{children}
		</AppShell>
	);
};

export default AppWrapper;
