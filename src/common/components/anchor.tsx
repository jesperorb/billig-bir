import { Anchor as MantineAnchor, type AnchorProps } from "@mantine/core";
import { createLink, type LinkComponent } from "@tanstack/react-router";

const MantineLinkComponent = ({
	ref,
	...props
}: Omit<AnchorProps, "href"> & {
	ref?: React.RefObject<HTMLAnchorElement | null>;
}) => {
	return <MantineAnchor ref={ref} {...props} />;
};

const CreatedLinkComponent = createLink(MantineLinkComponent);

export const Anchor: LinkComponent<typeof MantineLinkComponent> = (props) => {
	return <CreatedLinkComponent preload="intent" {...props} />;
};
