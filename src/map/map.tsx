import { Badge, HoverCard, Text, Anchor, Space } from "@mantine/core";
import { memo } from "react";
// eslint-disable-next-line import/no-unresolved
import Map, { Marker } from "react-map-gl/mapbox";

import { DEFAULT_STYLING, INITIAL_VIEW_STATE, MAPBOX_TOKEN } from "./constants";

import { BeerLocation } from "../types/beerLocation";

import "mapbox-gl/dist/mapbox-gl.css";

interface Props {
  beerLocations: BeerLocation[];
}

const MapContainer = ({ beerLocations }: Props) => {
  return (
    <Map
      reuseMaps
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={INITIAL_VIEW_STATE}
      style={DEFAULT_STYLING}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      {beerLocations.map((location) => (
        <Marker
          key={location.name}
          latitude={location.latitude}
          longitude={location.longitude}
        >
          <HoverCard>
            <HoverCard.Target>
              <Badge color="dark">{location.price}</Badge>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text>{location.name}</Text>
              <Text c="gray">Uppdaterad: {location.updated}</Text>
              {location.mapsUrl && (
                <Anchor href={location.mapsUrl} target="_blank">
                  Google Maps
                </Anchor>
              )}
              <Space />
              {location.websiteUrl && (
                <Anchor href={location.websiteUrl} target="_blank">
                  Hemsida
                </Anchor>
              )}
            </HoverCard.Dropdown>
          </HoverCard>
        </Marker>
      ))}
    </Map>
  );
};

export default memo(MapContainer);
