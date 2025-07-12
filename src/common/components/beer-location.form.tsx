import { useForm, Controller, useFieldArray } from 'react-hook-form';
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
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { DEFAULT_AW_TIME_VALUE, DEFAULT_FORM_VALUES, WEEKDAY_NAMES_AS_LIST } from '@common/constants';
import { AWStartAndEndTimesFormData, BeerLocationFormData } from '@common/types/beer-location-form-data';

interface Props {
	defaultValues?: BeerLocationFormData;
	showClearButton?: boolean;
	loading: boolean;
	onSubmit: (data: BeerLocationFormData) => Promise<void>;
	onRemoveAwTime?: (awTime: AWStartAndEndTimesFormData) => Promise<void>;
}

export const BeerLocationForm = ({
	defaultValues = DEFAULT_FORM_VALUES,
	onSubmit,
	showClearButton = true,
	onRemoveAwTime,
	loading,
}: Props) => {
	const {
		control,
		handleSubmit,
		reset,
		watch,
	} = useForm<BeerLocationFormData>({
		defaultValues: defaultValues
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'awTimes',
		keyName: 'fieldId',
	});

	const watchFieldArray = watch("awTimes");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...(watchFieldArray ? watchFieldArray[index] : {})
    };
  });

	const internalOnSubmit = (data: BeerLocationFormData) => {
		onSubmit(data)
	};

	const addAWTime = async () => {
		append({
			...DEFAULT_AW_TIME_VALUE,
			weekday: Math.max(...controlledFields.map(field => field.weekday)) + 1,
		});
	};

	return (
		<>
			<form onSubmit={handleSubmit(internalOnSubmit)}>
				<Stack gap="md">
					<Controller
						name="name"
						control={control}
						rules={{ required: 'Fyll i namn på plats' }}
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
					<Group grow>
						<Controller
							name="latitude"
							control={control}
							rules={{
								required: 'Fyll i latitude',
								min: { value: -90, message: 'Latitud måste vara mellan -90 och 90' },
								max: { value: 90, message: 'Latitud måste vara mellan -90 och 90' }
							}}
							render={({ field, fieldState }) => (
								<NumberInput
									{...field}
									label="Latitud"
									placeholder="Fyll i latitud med ett värde mellan -90 och 90"
									error={fieldState.error?.message}
									withAsterisk
								/>
							)}
						/>

						<Controller
							name="longitude"
							control={control}
							rules={{
								required: 'Fyll i longitude med ett värde mellan -180 och 180',
								min: { value: -180, message: 'Longitud måste vara mellan -180 och 180' },
								max: { value: 180, message: 'Longitud måste vara mellan -180 och 180' }
							}}
							render={({ field, fieldState }) => (
								<NumberInput
									{...field}
									label="Longitud"
									placeholder="Fyll i longitud"
									error={fieldState.error?.message}
									withAsterisk
								/>
							)}
						/>
					</Group>

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
					<Group grow>
						<Controller
							name="price"
							control={control}
							rules={{
								required: 'Fyll i standardpris',
								min: { value: 0, message: 'Standardpriset måste vara över 0' }
							}}
							render={({ field, fieldState }) => (
								<NumberInput
									{...field}
									label="Standardpris (SEK)"
									placeholder="Fyll i standardpris"
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
								min: { value: 0, message: 'Priset för kanna måste vara över 0' }
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
								min: { value: 0, message: 'After Work-priset måste vara över 0' }
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
					</Group>
					<Group grow>
						<Controller
							name="centilitersStandard"
							control={control}
							rules={{
								required: 'Fyll i standardvolym',
								min: { value: 1, message: 'Volymen måste vara över 0' }
							}}
							render={({ field, fieldState }) => (
								<NumberInput
									{...field}
									label="Standardvolym (cl)"
									placeholder="Fyll i standardvolym"
									error={fieldState.error?.message}
									withAsterisk
								/>
							)}
						/>

						<Controller
							name="centilitersPitcher"
							control={control}
							rules={{
								min: { value: 1, message: 'Volymen måste vara över 0' }
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
					</Group>

					<Group>
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
					</Group>

					<Controller
						name="urlMaps"
						control={control}
						rules={{
							pattern: {
								value: /^https?:\/\/.+/,
								message: 'Fyll i en URl som börjar på https://'
							}
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
								message: 'Fyll i en URl som börjar på https://'
							}
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
							<Text>Ange i kombination med fältet "After Work-pris". Lägg till flera tider om det varierar beroende på dag. Lägg till en tid och markera "Samma tider hela vecka" om platsen alltid har samma AW-tider. Hoppa över detta om priset inte är beroende av AW-tider.</Text>
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
									controlledFields.some(field => field.sameTimesAllWeek) ||
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
													value={fieldProps.value?.toString()}
													onChange={(value) => fieldProps.onChange(value ? parseInt(value) : 1)}
													label="Veckodag"
													data={WEEKDAY_NAMES_AS_LIST}
													style={{ flex: 1 }}
												/>
											)}
										/>

										<Controller
											name={`awTimes.${index}.startTime`}
											control={control}
											render={({ field: fieldProps }) => (
												<TextInput
													{...fieldProps}
													label="Starttid"
													placeholder="HH:MM"
													style={{ flex: 1 }}
												/>
											)}
										/>

										<Controller
											name={`awTimes.${index}.endTime`}
											control={control}
											render={({ field: fieldProps }) => (
												<TextInput
													{...fieldProps}
													label="Sluttid"
													placeholder="HH:MM"
													style={{ flex: 1 }}
												/>
											)}
										/>

										<Controller
											name={`awTimes.${index}.sameTimesAllWeek`}
											control={control}
											render={({ field: { value, onChange, ...fieldProps } }) => (
												<Switch
													{...fieldProps}
													checked={value || false}
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
												if(onRemoveAwTime) {
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
						{showClearButton &&
							<Button variant="outline" color="red" onClick={() => reset()} loading={loading}>
								Rensa
							</Button>
						}
						<Button type="submit" loading={loading}>
							Spara
						</Button>
					</Group>
				</Stack>
			</form>
			<Space h="lg" />
		</>
	);
};

