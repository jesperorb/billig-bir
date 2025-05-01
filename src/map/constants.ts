import { type CSSProperties } from "react";
// eslint-disable-next-line import/no-unresolved
import { type ViewState } from "react-map-gl/mapbox";

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

export const DEFAULT_STYLING: CSSProperties = {
  width: "100%",
  height:
    "calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))",
};
