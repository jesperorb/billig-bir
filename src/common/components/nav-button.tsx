import { Button, type ButtonProps } from "@mantine/core";
import { createLink, type LinkComponent } from "@tanstack/react-router";

const MantineNavButtonComponent = ({
	ref,
	...props
}: Omit<ButtonProps, "href"> & {
	ref?: React.RefObject<HTMLAnchorElement | null>;
}) => {
	return <Button component="a" ref={ref} {...props} />;
};

const CreatedNavButtonComponent = createLink(MantineNavButtonComponent);

export const NavButton: LinkComponent<typeof MantineNavButtonComponent> = (
	props,
) => {
	return <CreatedNavButtonComponent preload="intent" {...props} />;
};
