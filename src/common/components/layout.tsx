import { AppShell, Burger, Flex, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import { type PropsWithChildren } from "react";

import {
	IsMenuOpenContext,
	ToggleIsMenuOpenContext,
} from "@common/context/menu-context";
import { ThemeToggle } from "@common/theme/ThemeToggle";

import InformationDialog from "./information.dialog";
import { NavButton } from "./nav-button";

interface Props extends PropsWithChildren {
	collapseMenuOnDesktop?: boolean;
}

const Layout = ({ children, collapseMenuOnDesktop = false }: Props) => {
	const [menuOpen, { toggle }] = useDisclosure();
	return (
		<IsMenuOpenContext value={menuOpen}>
			<ToggleIsMenuOpenContext value={toggle}>
				<AppShell
					header={{ height: 70 }}
					navbar={{
						width: 300,
						breakpoint: "sm",
						collapsed: { mobile: !menuOpen, desktop: collapseMenuOnDesktop },
					}}
				>
					<AppShell.Header>
						<Flex justify="space-between" align="center">
							<NavButton
								variant="white"
								to="/"
								leftSection={<IconChevronLeft />}
							>
								Start
							</NavButton>
							<Group h="100%" p="sm">
								<Burger
									opened={menuOpen}
									onClick={toggle}
									hiddenFrom="sm"
									size="sm"
								/>
								<Title order={1}>billig.beer</Title>
							</Group>
							<Group h="100%" p="xs">
								<ThemeToggle />
								<InformationDialog />
							</Group>
						</Flex>
					</AppShell.Header>
					{children}
				</AppShell>
			</ToggleIsMenuOpenContext>
		</IsMenuOpenContext>
	);
};

export default Layout;
