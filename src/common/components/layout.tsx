import {
	AppShell,
	Box,
	Burger,
	Group,
	LoadingOverlay,
	Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import { Suspense, type PropsWithChildren } from "react";

import {
	IsMenuOpenContext,
	ToggleIsMenuOpenContext,
} from "@common/context/menu-context";
import { ThemeToggle } from "@common/theme/ThemeToggle";

import InformationActionsDesktop from "./information-actions.desktop";
import { NavButton } from "./nav-button";

interface Props extends PropsWithChildren {
	collapseMenuOnDesktop?: boolean;
	hideMenu?: boolean;
}

const Layout = ({ children, collapseMenuOnDesktop = false }: Props) => {
	const [menuOpen, { toggle }] = useDisclosure();
	return (
		<Suspense
			fallback={
				<LoadingOverlay
					visible
					zIndex={1000}
					overlayProps={{ radius: "sm", blur: 2 }}
				/>
			}
		>
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
							<Box
								style={{
									display: "grid",
									gridTemplateColumns: "1fr auto 1fr",
									alignItems: "center",
									padding: "var(--mantine-spacing-sm)",
									height: "100%",
								}}
							>
								<NavButton
									variant="transparent"
									justify="start"
									pl={0}
									size="compact-sm"
									to="/"
									leftSection={<IconChevronLeft />}
								>
									Start
								</NavButton>
								<Title order={1} size="h3">
									billig.beer
								</Title>
								<Group justify="flex-end" h="100%" hiddenFrom="sm">
									<Burger opened={menuOpen} onClick={toggle} size="sm" />
								</Group>
								<Group visibleFrom="sm" justify="flex-end" h="100%">
									<ThemeToggle />
									<InformationActionsDesktop />
								</Group>
							</Box>
						</AppShell.Header>
						{children}
					</AppShell>
				</ToggleIsMenuOpenContext>
			</IsMenuOpenContext>
		</Suspense>
	);
};

export default Layout;
