/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
	TextInput,
	NumberInput,
	Switch,
	Select,
	Button,
	Group,
	Stack,
	Paper,
	Title,
	Box,
	ActionIcon,
	Divider,
	Space,
	Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconTrash, IconMap } from "@tabler/icons-react";
import {
	useForm,
	Controller,
	useFieldArray,
	SubmitHandler,
} from "react-hook-form";

import {
	DEFAULT_AW_TIME_VALUE,
	DEFAULT_FORM_VALUES,
	WEEKDAY_NAMES_AS_LIST,
} from "@common/constants";
import {
	AWStartAndEndTimesFormData,
	BeerLocationFormData,
} from "@common/types/beer-location-form-data";
import { District } from "@common/types/district";

import { DistrictSelect } from "./district-select/district-select";
import { MapLocationPickerDialog } from "./map-location-picker.dialog";

interface Props {
	defaultValues?: BeerLocationFormData;
	showClearButton?: boolean;
	loading: boolean;
	submitButtonText?: string;
	districts: District[] | undefined;
	onSubmit: (data: BeerLocationFormData) => Promise<void>;
	onRemoveAwTime?: (awTime: AWStartAndEndTimesFormData) => Promise<void>;
}

export const BeerLocationForm = ({
	defaultValues = DEFAULT_FORM_VALUES,
	onSubmit,
	showClearButton = true,
	submitButtonText,
	onRemoveAwTime,
	loading,
	districts,
}: Props) => {
	const { control, handleSubmit, reset, watch, setValue } =
		useForm<BeerLocationFormData>({
			defaultValues: defaultValues,
		});
	const { fields, append, remove } = useFieldArray({
		control,
		name: "awTimes",
		keyName: "fieldId",
	});

	const [mapOpened, { open: openMap, close: closeMap }] = useDisclosure(false);

	const watchFieldArray = watch("awTimes");
	const watchLatitude = watch("latitude");
	const watchLongitude = watch("longitude");
	const controlledFields = fields.map((field, index) => {
		return {
			...field,
			...(watchFieldArray ? watchFieldArray[index] : {}),
		};
	});

	const internalOnSubmit: SubmitHandler<BeerLocationFormData> = (data) => {
		onSubmit(data);
	};

	const addAWTime = () => {
		const weekday =
			fields.length === 0
				? 0
				: Math.max(...controlledFields.map((field) => field.weekday)) + 1;
		append({
			...DEFAULT_AW_TIME_VALUE,
			weekday: weekday,
		});
	};

	const handleMapLocationSelect = (latitude: number, longitude: number) => {
		setValue("latitude", latitude);
		setValue("longitude", longitude);
	};

	return (
		<>
			<form onSubmit={handleSubmit(internalOnSubmit)}>
				<Stack gap="md">
					<Controller
						name="name"
						control={control}
						rules={{ required: "Fyll i namn på plats" }}
						render={({ field, fieldState }) => (
							<TextInput
								{...field}
								label="Platsnamn"
								placeholder="T.ex. 'O'Learys'"
								error={fieldState.error?.message}
								withAsterisk
							/>
						)}
					/>

					<Controller
						name="beerBrand"
						control={control}
						rules={{ required: "Fyll i märke på öl (t.ex. 'Mariestad')" }}
						render={({ field, fieldState }) => (
							<TextInput
								{...field}
								label="Ölmärke"
								placeholder="T.ex. 'Mariestad'"
								error={fieldState.error?.message}
								withAsterisk
							/>
						)}
					/>
					<Box
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
							gap: "var(--mantine-spacing-md)",
						}}
					>
						<Controller
							name="price"
							control={control}
							rules={{
								required: "Fyll i pris",
								min: { value: 0, message: "Priset måste vara över 0" },
							}}
							render={({ field, fieldState }) => (
								<NumberInput
									{...field}
									label="Pris (SEK)"
									placeholder="Fyll i pris"
									error={fieldState.error?.message}
									decimalScale={0}
									withAsterisk
								/>
							)}
						/>

						<Controller
							name="pricePitcher"
							control={control}
							rules={{
								min: {
									value: 0,
									message: "Priset för kanna måste vara över 0",
								},
							}}
							render={({ field, fieldState }) => (
								<NumberInput
									{...field}
									label="Pris för kanna (SEK)"
									placeholder="Valfritt"
									error={fieldState.error?.message}
									decimalScale={0}
								/>
							)}
						/>

						<Controller
							name="priceAW"
							control={control}
							rules={{
								min: {
									value: 0,
									message: "After Work-priset måste vara över 0",
								},
							}}
							render={({ field, fieldState }) => (
								<NumberInput
									{...field}
									label="After Work-pris (SEK)"
									placeholder="Valfritt"
									error={fieldState.error?.message}
									decimalScale={0}
								/>
							)}
						/>
					</Box>
					<Box
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
							gap: "var(--mantine-spacing-md)",
						}}
					>
						<Controller
							name="centilitersStandard"
							control={control}
							rules={{
								required: "Fyll i volym",
								min: { value: 1, message: "Volymen måste vara över 0" },
							}}
							render={({ field, fieldState }) => (
								<NumberInput
									{...field}
									label="Volym (cl)"
									placeholder="Fyll i volym"
									error={fieldState.error?.message}
									withAsterisk
								/>
							)}
						/>

						<Controller
							name="centilitersPitcher"
							control={control}
							rules={{
								min: { value: 1, message: "Volymen måste vara över 0" },
							}}
							render={({ field, fieldState }) => (
								<NumberInput
									{...field}
									label="Volym på kanna (cl)"
									placeholder="Valfritt"
									error={fieldState.error?.message}
								/>
							)}
						/>
					</Box>

					<Box
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
							gap: "var(--mantine-spacing-md)",
						}}
					>
						<Controller
							name="outdoorSeating"
							control={control}
							render={({ field: { value, onChange, ...field } }) => (
								<Switch
									{...field}
									checked={value}
									onChange={onChange}
									label="Uteservering"
								/>
							)}
						/>

						<Controller
							name="afternoonSun"
							control={control}
							render={({ field: { value, onChange, ...field } }) => (
								<Switch
									{...field}
									checked={value}
									onChange={onChange}
									label="Eftermiddagssol"
								/>
							)}
						/>
					</Box>

					<Box
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
							gap: "var(--mantine-spacing-md)",
							alignItems: "end",
						}}
					>
						<Controller
							name="latitude"
							control={control}
							rules={{
								required: "Fyll i latitude",
								min: {
									value: 59.1,
									message:
										"Latitud måste vara mellan 59.1 och 59.55 (Stockholm)",
								},
								max: {
									value: 59.55,
									message:
										"Latitud måste vara mellan 59.1 och 59.55 (Stockholm)",
								},
							}}
							render={({ field, fieldState }) => (
								<NumberInput
									{...field}
									label="Latitud"
									placeholder="Fyll i latitud för Stockholm (59.1 - 59.55)"
									error={fieldState.error?.message}
									withAsterisk
								/>
							)}
						/>

						<Controller
							name="longitude"
							control={control}
							rules={{
								required: "Fyll i longitude",
								min: {
									value: 17.6,
									message:
										"Longitud måste vara mellan 17.6 och 18.5 (Stockholm)",
								},
								max: {
									value: 18.5,
									message:
										"Longitud måste vara mellan 17.6 och 18.5 (Stockholm)",
								},
							}}
							render={({ field, fieldState }) => (
								<NumberInput
									{...field}
									label="Longitud"
									placeholder="Fyll i longitud för Stockholm (17.6 - 18.5)"
									error={fieldState.error?.message}
									withAsterisk
								/>
							)}
						/>

						<Button
							variant="outline"
							leftSection={<IconMap size={16} />}
							onClick={openMap}
							disabled={loading}
						>
							Välj position på karta
						</Button>
					</Box>

					<Controller
						name="districtIds"
						control={control}
						defaultValue={defaultValues.districts?.map((d) => d.id.toString())}
						render={({ field, fieldState }) => (
							<DistrictSelect
								placeholder="Välj stadsdelar"
								value={field.value ?? []}
								districts={districts ?? []}
								onChange={field.onChange}
								error={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						name="urlMaps"
						control={control}
						rules={{
							pattern: {
								value: /^https?:\/\/.+/,
								message: "Fyll i en URl som börjar på https://",
							},
						}}
						render={({ field, fieldState }) => (
							<TextInput
								{...field}
								label="URL för Google Maps"
								placeholder="Fyll i URL för Google Maps"
								error={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						name="urlWebsite"
						control={control}
						rules={{
							pattern: {
								value: /^https?:\/\/.+/,
								message: "Fyll i en URl som börjar på https://",
							},
						}}
						render={({ field, fieldState }) => (
							<TextInput
								{...field}
								label="URL för hemsida"
								placeholder="Fyll i URL för hemsida"
								error={fieldState.error?.message}
							/>
						)}
					/>

					<Divider />

					<Box>
						<Stack>
							<Title order={4}>After Work-tider</Title>
							<Text>
								Ange i kombination med fältet "After Work-pris". Lägg till flera
								tider om det varierar beroende på dag. Lägg till en tid och
								markera "Samma tider hela vecka" om platsen alltid har samma
								AW-tider. Hoppa över detta om priset inte är beroende av
								AW-tider.
							</Text>
						</Stack>
						<Space h="md" />
						<Group justify="end">
							<Button
								leftSection={<IconPlus size={16} />}
								variant="light"
								size="sm"
								onClick={addAWTime}
								loading={loading}
								disabled={
									controlledFields.some((field) => field.sameTimesAllWeek) ||
									controlledFields.length >= 5
								}
							>
								Lägg till AW-tid
							</Button>
						</Group>
						<Space h="md" />
						<Stack gap="sm">
							{controlledFields.map((field, index) => (
								<Paper key={field.fieldId} p="sm" withBorder>
									<Group>
										<Controller
											name={`awTimes.${index}.weekday`}
											control={control}
											render={({ field: fieldProps }) => (
												<Select
													{...fieldProps}
													value={fieldProps.value.toString()}
													onChange={(value) => {
														fieldProps.onChange(value ? parseInt(value) : 1);
													}}
													label="Veckodag"
													data={WEEKDAY_NAMES_AS_LIST}
													style={{ flex: 1 }}
												/>
											)}
										/>

										<Controller
											name={`awTimes.${index}.startTime`}
											control={control}
											rules={{
												pattern: {
													value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
													message: "Ange tid i format HH:MM (t.ex. 15:30)",
												},
											}}
											render={({ field: fieldProps, fieldState }) => (
												<TextInput
													{...fieldProps}
													label="Starttid"
													placeholder="HH:MM"
													style={{ flex: 1 }}
													error={fieldState.error?.message}
												/>
											)}
										/>

										<Controller
											name={`awTimes.${index}.endTime`}
											control={control}
											rules={{
												pattern: {
													value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
													message: "Ange tid i format HH:MM (t.ex. 17:00)",
												},
											}}
											render={({ field: fieldProps, fieldState }) => (
												<TextInput
													{...fieldProps}
													label="Sluttid"
													placeholder="HH:MM"
													style={{ flex: 1 }}
													error={fieldState.error?.message}
												/>
											)}
										/>

										<Controller
											name={`awTimes.${index}.sameTimesAllWeek`}
											control={control}
											render={({
												field: { value, onChange, ...fieldProps },
											}) => (
												<Switch
													{...fieldProps}
													checked={value ?? false}
													onChange={onChange}
													label="Samma tider hela veckan"
													mt="xl"
												/>
											)}
										/>

										<ActionIcon
											color="red"
											variant="light"
											onClick={async () => {
												if (onRemoveAwTime) {
													await onRemoveAwTime(field);
												}
												remove(index);
											}}
											mt="xl"
											loading={loading}
										>
											<IconTrash size={16} />
										</ActionIcon>
									</Group>
								</Paper>
							))}
						</Stack>
					</Box>

					<Group justify="flex-end" mt="lg">
						{showClearButton && (
							<Button
								variant="outline"
								color="red"
								onClick={() => {
									reset();
								}}
								loading={loading}
							>
								Rensa formulär
							</Button>
						)}
						<Button type="submit" loading={loading}>
							{submitButtonText ?? "Spara"}
						</Button>
					</Group>
				</Stack>
			</form>
			<Space h="lg" />
			<MapLocationPickerDialog
				opened={mapOpened}
				onClose={closeMap}
				onConfirm={handleMapLocationSelect}
				initialLatitude={watchLatitude}
				initialLongitude={watchLongitude}
			/>
		</>
	);
};
