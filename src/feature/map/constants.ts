import { type CSSProperties } from "react";
import { LngLatBoundsLike, type ViewState } from "react-map-gl/mapbox";

export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export const INITIAL_CENTER = {
	latitude: 59.32951910126717,
	longitude: 18.060910234272427,
};

export const INITIAL_ZOOM = 14;

export const INITIAL_VIEW_STATE: Partial<ViewState> = {
	longitude: INITIAL_CENTER.longitude,
	latitude: INITIAL_CENTER.latitude,
	zoom: INITIAL_ZOOM,
};

export const MAX_BOUNDS: LngLatBoundsLike = [
	[17.6, 59.1], // Southwest corner (longitude, latitude)
	[18.5, 59.55], // Northeast corner (longitude, latitude)
];

export const DEFAULT_STYLING: CSSProperties = {
	width: "100%",
	height:
		"calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))",
};
