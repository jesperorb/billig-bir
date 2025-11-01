import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";

import { RouterContext } from "@common/types/router";
import { DefaultCatchBoundary } from "@common/components/default-catch-boundary";
import { NotFound } from "@common/components/not-found";
import ThemeWrapper from "@common/theme/theme-wrapper";
import type { ReactNode } from "react";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import cssHref from "./__root.css?url";

export const Route = createRootRouteWithContext<RouterContext>()({
	head: () => ({
		links: [{ rel: "stylesheet", href: cssHref }],
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "billig.beer",
			},
		],
	}),
	component: RootComponent,
	errorComponent: (props) => {
		return (
			<RootDocument>
				<DefaultCatchBoundary {...props} />
			</RootDocument>
		);
	},
	notFoundComponent: () => <NotFound />,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
				<HeadContent />
			</head>
			<body>
				<ThemeWrapper>{children}</ThemeWrapper>
				<Scripts />
			</body>
		</html>
	);
}
