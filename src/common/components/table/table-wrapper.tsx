import { Box } from "@mantine/core";
import { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
	header: ReactNode;
}

export const TableWrapper = ({ header, children }: Props) => {
	return (
		<Box
			style={{
				display: "flex",
				flexDirection: "column",
				height:
					"calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))",
				overflow: "hidden",
			}}
		>
			{header}
			<Box style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
				{children}
			</Box>
		</Box>
	);
};
