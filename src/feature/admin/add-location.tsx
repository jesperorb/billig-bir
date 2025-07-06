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
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { BeerLocationFormData } from './types';
import { useCreateBeerLocation } from './queries';

const weekdayOptions = [
  { value: '1', label: 'Måndag' },
  { value: '2', label: 'Tisdag' },
  { value: '3', label: 'Onsdag' },
  { value: '4', label: 'Torsdag' },
  { value: '5', label: 'Fredag' },
  { value: '6', label: 'Lördag' },
  { value: '0', label: 'Söndag' },
];

export const AddLocation = () => {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<BeerLocationFormData>({
    defaultValues: {
      name: '',
      latitude: 0,
      longitude: 0,
      price: 79,
      pricePitcher: undefined,
      priceAW: undefined,
      awTimes: [],
      outdoorSeating: false,
      afternoonSun: false,
      beerBrand: '',
      centilitersStandard: 40,
      centilitersPitcher: undefined,
      urlMaps: '',
      urlWebsite: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'awTimes',
  });

	const mutation = useCreateBeerLocation();

  const onSubmit = (data: BeerLocationFormData) => {
		mutation.mutate(data);
  };

  const addAWTime = () => {
    append({
      id: crypto.randomUUID(),
      startTime: '16:00' as const,
      endTime: '18:00' as const,
      weekday: 1,
      sameTimesAllWeek: false,
    });
  };

  return (
    <>
      <Title order={2} mb="lg">Lägg till plats</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Platsnamn är obligatoriskt' }}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="Platsnamn"
                placeholder="Ange platsnamn"
                error={fieldState.error?.message}
                required
              />
            )}
          />
          <Group grow>
            <Controller
              name="latitude"
              control={control}
              rules={{ 
                required: 'Latitud är obligatorisk',
                min: { value: -90, message: 'Latitud måste vara mellan -90 och 90' },
                max: { value: 90, message: 'Latitud måste vara mellan -90 och 90' }
              }}
              render={({ field, fieldState }) => (
                <NumberInput
                  {...field}
                  label="Latitud"
                  placeholder="Ange latitud"
                  error={fieldState.error?.message}
                  decimalScale={6}
                  required
                />
              )}
            />
            
            <Controller
              name="longitude"
              control={control}
              rules={{ 
                required: 'Longitud är obligatorisk',
                min: { value: -180, message: 'Longitud måste vara mellan -180 och 180' },
                max: { value: 180, message: 'Longitud måste vara mellan -180 och 180' }
              }}
              render={({ field, fieldState }) => (
                <NumberInput
                  {...field}
                  label="Longitud"
                  placeholder="Ange longitud"
                  error={fieldState.error?.message}
                  decimalScale={6}
                  required
                />
              )}
            />
          </Group>

          <Controller
            name="beerBrand"
            control={control}
            rules={{ required: 'Ölmärke är obligatoriskt' }}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="Ölmärke"
                placeholder="Ange ölmärke"
                error={fieldState.error?.message}
                required
              />
            )}
          />
          <Group grow>
            <Controller
              name="price"
              control={control}
              rules={{ 
                required: 'Standardpris är obligatoriskt',
                min: { value: 0, message: 'Priset måste vara positivt' }
              }}
              render={({ field, fieldState }) => (
                <NumberInput
                  {...field}
                  label="Standardpris (SEK)"
                  placeholder="Ange standardpris"
                  error={fieldState.error?.message}
                  decimalScale={0}
                  required
                />
              )}
            />
            
            <Controller
              name="pricePitcher"
              control={control}
              rules={{ 
                min: { value: 0, message: 'Priset måste vara positivt' }
              }}
              render={({ field, fieldState }) => (
                <NumberInput
                  {...field}
                  label="Kannpris (SEK)"
                  placeholder="Ange kannpris"
                  error={fieldState.error?.message}
                  decimalScale={0}
                />
              )}
            />
            
            <Controller
              name="priceAW"
              control={control}
              rules={{ 
                min: { value: 0, message: 'Priset måste vara positivt' }
              }}
              render={({ field, fieldState }) => (
                <NumberInput
                  {...field}
                  label="After Work-pris (SEK)"
                  placeholder="Ange AW-pris"
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
                required: 'Standardvolym är obligatorisk',
                min: { value: 1, message: 'Volymen måste vara positiv' }
              }}
              render={({ field, fieldState }) => (
                <NumberInput
                  {...field}
                  label="Standardvolym (cl)"
                  placeholder="Ange standardvolym"
                  error={fieldState.error?.message}
                  required
                />
              )}
            />
            
            <Controller
              name="centilitersPitcher"
              control={control}
              rules={{ 
                min: { value: 1, message: 'Volymen måste vara positiv' }
              }}
              render={({ field, fieldState }) => (
                <NumberInput
                  {...field}
                  label="Kannvolym (cl)"
                  placeholder="Ange kannvolym"
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
                message: 'Ange en giltig URL'
              }
            }}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="Kart-URL"
                placeholder="Ange kart-URL"
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
                message: 'Ange en giltig URL'
              }
            }}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="Webbplats-URL"
                placeholder="Ange webbplats-URL"
                error={fieldState.error?.message}
              />
            )}
          />

          <Divider />
          
          <Box>
            <Group justify="space-between" mb="sm">
              <Title order={4}>After Work-tider</Title>
              <Button
                leftSection={<IconPlus size={16} />}
                variant="light"
                size="sm"
                onClick={addAWTime}
              >
                Lägg till AW-tid
              </Button>
            </Group>
            
            <Stack gap="sm">
              {fields.map((field, index) => (
                <Paper key={field.id} p="sm" withBorder>
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
                          data={weekdayOptions}
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
                      onClick={() => remove(index)}
                      mt="xl"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Box>

          <Group justify="flex-end" mt="lg">
            <Button variant="outline" onClick={() => reset()}>
              Rensa
            </Button>
            <Button type="submit">
              Lägg till plats
            </Button>
          </Group>
        </Stack>
      </form>
			<Space h="lg" />
    </>
  );
};
