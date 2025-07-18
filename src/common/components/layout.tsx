import { AppShell, Burger, Flex, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "@tanstack/react-router";
import { type PropsWithChildren } from "react";

import {
	IsMenuOpenContext,
	ToggleIsMenuOpenContext,
} from "@common/context/menu-context";
import { ThemeToggle } from "@common/theme/ThemeToggle";

import InformationDialog from "./information.dialog";

const AppWrapper = ({ children }: PropsWithChildren) => {
	const [menuOpen, { toggle }] = useDisclosure();
	const navigate = useNavigate();
	return (
		<IsMenuOpenContext value={menuOpen}>
			<ToggleIsMenuOpenContext value={toggle}>
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
								<Title
									onClick={() => {
										navigate({ to: "/" });
									}}
									order={1}
								>
									billig.beer
								</Title>
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

export default AppWrapper;
