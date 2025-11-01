import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { RouterContext } from "@common/types/router";
import { DefaultCatchBoundary } from "@common/components/default-catch-boundary";
import { NotFound } from "@common/components/not-found";
import ThemeWrapper from "@common/theme/theme-wrapper";
import type { ReactNode } from "react";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import cssHref from "./__root.css?url";
import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerClient } from "@common/api/api-client";

const fetchUser = createServerFn({ method: "GET" }).handler(async () => {
	const supabase = getSupabaseServerClient();
	const { data, error: _error } = await supabase.auth.getUser();

	if (!data.user?.email) {
		return null;
	}

	return {
		email: data.user.email,
	};
});

export const Route = createRootRouteWithContext<RouterContext>()({
	beforeLoad: async () => {
		const user = await fetchUser();
		return {
			user,
		};
	},
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
				<TanStackRouterDevtools position="bottom-right" />
				<ReactQueryDevtools buttonPosition="bottom-left" />
				<Scripts />
			</body>
		</html>
	);
}
