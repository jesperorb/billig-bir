import { NavLink as MantineNavLink, type NavLinkProps } from "@mantine/core";
import { createLink, type LinkComponent } from "@tanstack/react-router";

const MantineNavLinkComponent = ({
	ref,
	...props
}: Omit<NavLinkProps, "href"> & {
	ref?: React.RefObject<HTMLAnchorElement | null>;
}) => {
	return <MantineNavLink ref={ref} {...props} />;
};

const CreatedLinkComponent = createLink(MantineNavLinkComponent);

export const NavLink: LinkComponent<typeof MantineNavLinkComponent> = (
	props,
) => {
	return <CreatedLinkComponent preload="intent" {...props} />;
};
