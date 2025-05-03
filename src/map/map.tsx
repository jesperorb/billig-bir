import {
  Badge,
  HoverCard,
  Text,
  Anchor,
  Group,
  List,
  Divider,
  Paper,
} from "@mantine/core";
import { memo } from "react";
// eslint-disable-next-line import/no-unresolved
import Map, { Marker } from "react-map-gl/mapbox";

import { DEFAULT_STYLING, INITIAL_VIEW_STATE, MAPBOX_TOKEN } from "./constants";

import { BeerLocation } from "../types/beerLocation";
import "mapbox-gl/dist/mapbox-gl.css";
import { getStandardAWAdjustedPrice } from "../utils";

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
              <Paper color="dark" p="xs" shadow="lg">
                <Text size="xs" fw={700}>
                  {getStandardAWAdjustedPrice(location)}
                </Text>
              </Paper>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Group justify="space-between">
                <Text fw={500}>{location.name}</Text>
                <Badge color="orange">
                  {`${getStandardAWAdjustedPrice(location).toString()} kr / 40 cl`}
                </Badge>
              </Group>
              <Group justify="space-between">
                <Text c="dimmed">Typ: {location.beerBrand}</Text>
                {location.centiliters !== 40 && (
                  <Badge color="dark">
                    {`${location.price.toString()} kr / ${location.centiliters.toString()} cl`}
                  </Badge>
                )}
              </Group>
              <Divider mt="sm" variant="dotted" />
              <List mt="sm" mb="sm">
                {location.mapsUrl && (
                  <List.Item>
                    <Anchor href={location.mapsUrl} target="_blank">
                      Google Maps
                    </Anchor>
                  </List.Item>
                )}
                {location.websiteUrl && (
                  <List.Item>
                    <Anchor href={location.websiteUrl} target="_blank">
                      Hemsida
                    </Anchor>
                  </List.Item>
                )}
              </List>
              <Divider variant="dotted" mb="sm" />
              <Text c="dimmed">Uppdaterad: {location.updated}</Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Marker>
      ))}
    </Map>
  );
};

export default memo(MapContainer);
