import { useComputedColorScheme } from "@mantine/core";
import { memo, PropsWithChildren, type Ref, type CSSProperties } from "react";
import Map, { type MapRef, type ViewState } from "react-map-gl/mapbox";

import {
	DEFAULT_STYLING,
	INITIAL_VIEW_STATE,
	MAPBOX_TOKEN,
} from "@feature/map/constants";

import "mapbox-gl/dist/mapbox-gl.css";

interface Props extends PropsWithChildren {
	mapRef: Ref<MapRef> | undefined;
	initialViewState?: Partial<ViewState>;
	style?: CSSProperties;
	onMove?: () => void;
	interactive?: boolean;
}

const MapContainer = ({
	children,
	mapRef,
	initialViewState = INITIAL_VIEW_STATE,
	style = DEFAULT_STYLING,
	onMove,
	interactive = true,
}: Props) => {
	const colorScheme = useComputedColorScheme("light");
	return (
		<Map
			reuseMaps
			ref={mapRef}
			mapboxAccessToken={MAPBOX_TOKEN}
			initialViewState={initialViewState}
			style={style}
			mapStyle={
				colorScheme === "light"
					? "mapbox://styles/mapbox/streets-v12"
					: "mapbox://styles/mapbox/dark-v11"
			}
			onMove={onMove}
			interactive={interactive}
		>
			{children}
		</Map>
	);
};

export default memo(MapContainer);
