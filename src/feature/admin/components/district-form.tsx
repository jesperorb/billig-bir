import { TextInput, Switch, Button, Group, Stack } from "@mantine/core";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import type { District } from "@common/types/district";

interface DistrictFormProps {
	defaultValues?: Partial<District>;
	loading?: boolean;
	submitButtonText?: string;
	showCancelButton?: boolean;
	onSubmit: (data: District) => Promise<void>;
	onCancel?: () => void;
}

export const DistrictForm = ({
	defaultValues,
	loading = false,
	submitButtonText = "Spara",
	showCancelButton = true,
	onSubmit,
	onCancel,
}: DistrictFormProps) => {
	const { control, handleSubmit, reset } = useForm<District>({
		defaultValues: {
			name: "",
			insideTolls: false,
		},
	});

	useEffect(() => {
		if (defaultValues) {
			reset({
				name: defaultValues.name ?? "",
				insideTolls: defaultValues.insideTolls ?? false,
			});
		}
	}, [defaultValues, reset]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack gap="md">
				<Controller
					name="name"
					control={control}
					rules={{ required: "Fyll i namn på stadsdel" }}
					render={({ field, fieldState }) => (
						<TextInput
							{...field}
							label="Namn"
							placeholder="T.ex. 'Södermalm'"
							error={fieldState.error?.message}
							withAsterisk
						/>
					)}
				/>

				<Controller
					name="insideTolls"
					control={control}
					render={({ field: { value, onChange, ...field } }) => (
						<Switch
							{...field}
							checked={value}
							onChange={onChange}
							label="Innanför tullarna"
						/>
					)}
				/>

				<Group justify="flex-end" mt="lg">
					{showCancelButton && onCancel && (
						<Button variant="outline" onClick={onCancel} disabled={loading}>
							Avbryt
						</Button>
					)}
					<Button type="submit" color="hops.7" loading={loading}>
						{submitButtonText}
					</Button>
				</Group>
			</Stack>
		</form>
	);
};
