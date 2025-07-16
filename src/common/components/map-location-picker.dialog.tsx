import { Modal, Button, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconCheck, IconX, IconMapPinFilled } from "@tabler/icons-react";
import { useState, useRef, useCallback, useEffect } from "react";
import type { MapRef } from "react-map-gl/mapbox";
import { Marker } from "react-map-gl/mapbox";

import MapContainer from "@feature/map/components/map-container";

interface MapLocationPickerDialogProps {
	opened: boolean;
	onClose: () => void;
	onConfirm: (latitude: number, longitude: number) => void;
	initialLatitude?: number;
	initialLongitude?: number;
}

export const MapLocationPickerDialog = ({
	opened,
	onClose,
	onConfirm,
	initialLatitude = 59.3293, // Stockholm default
	initialLongitude = 18.0686,
}: MapLocationPickerDialogProps) => {
	const mapRef = useRef<MapRef>(null);
	const [currentCoords, setCurrentCoords] = useState({
		latitude: initialLatitude,
		longitude: initialLongitude,
	});

	const handleMapMove = useCallback(() => {
		if (mapRef.current) {
			const center = mapRef.current.getCenter();
			setCurrentCoords({
				latitude: center.lat,
				longitude: center.lng,
			});
		}
	}, []);

	const handleConfirm = () => {
		onConfirm(currentCoords.latitude, currentCoords.longitude);
		onClose();
	};

	// Update current coordinates when modal opens or initial values change
	useEffect(() => {
		setCurrentCoords({
			latitude: initialLatitude,
			longitude: initialLongitude,
		});

		if (opened && mapRef.current) {
			setTimeout(() => {
				mapRef.current?.flyTo({
					center: [initialLongitude, initialLatitude],
					zoom: 15,
					duration: 1000,
				});
			}, 100);
		}
	}, [opened, initialLatitude, initialLongitude]);

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title="Välj position på karta"
			size="lg"
			styles={{
				body: { padding: 0 },
				header: { paddingBottom: "var(--mantine-spacing-md)" },
			}}
		>
			<Stack gap={0}>
				<div
					style={{ position: "relative", height: "400px", overflow: "hidden" }}
				>
					<MapContainer
						mapRef={mapRef}
						initialViewState={{
							longitude: initialLongitude,
							latitude: initialLatitude,
							zoom: 15,
						}}
						style={{ width: "100%", height: "100%" }}
						onMove={handleMapMove}
						interactive={true}
					>
						{/* Center marker that follows the map center */}
						<Marker
							longitude={currentCoords.longitude}
							latitude={currentCoords.latitude}
							anchor="bottom"
						>
							<ThemeIcon variant="transparent">
								<IconMapPinFilled size={32} />
							</ThemeIcon>
						</Marker>
					</MapContainer>
				</div>

				<div style={{ padding: "var(--mantine-spacing-md)" }}>
					<Stack gap="md">
						<Text size="sm" c="dimmed">
							Panorera kartan för att välja position. Markören i mitten visar
							vald position.
						</Text>

						<Group justify="space-between" align="center">
							<Text size="sm">
								<strong>Koordinater:</strong> {currentCoords.latitude},{" "}
								{currentCoords.longitude}
							</Text>
						</Group>

						<Group justify="flex-end">
							<Button
								variant="outline"
								leftSection={<IconX size={16} />}
								onClick={onClose}
							>
								Avbryt
							</Button>
							<Button
								leftSection={<IconCheck size={16} />}
								onClick={handleConfirm}
							>
								Använd position
							</Button>
						</Group>
					</Stack>
				</div>
			</Stack>
		</Modal>
	);
};
