import { createFileRoute } from "@tanstack/react-router";

import Layout from "@common/components/layout";
import Map from "@feature/map";

export const Route = createFileRoute("/map")({
	component: () => (
		<Layout>
			<Map />
		</Layout>
	),
});
