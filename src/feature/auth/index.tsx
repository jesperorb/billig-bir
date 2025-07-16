import { AppShell, Button, Container, Space, TextInput } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { useApiClient } from "@common/api/api-client-context";
import { useSession } from "@common/api/use-session";

interface LoginFormData {
	email: string;
	password: string;
}

const Login = () => {
	const apiClient = useApiClient();
	const navigate = useNavigate();
	const session = useSession();

	const { control, handleSubmit } = useForm<LoginFormData>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async ({ email, password }: LoginFormData) => {
		await apiClient.auth.signInWithPassword({
			email,
			password,
		});
	};

	useEffect(() => {
		if (session?.user) {
			navigate({ to: "/admin" });
		}
	}, [session, navigate]);

	return (
		<AppShell.Main px="lg">
			<Container size={400}>
				<Space h="md" />
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="email"
						control={control}
						rules={{
							required: "Skriv in en email",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Ange en giltig email-adress",
							},
						}}
						render={({ field, fieldState }) => (
							<TextInput
								{...field}
								label="Email"
								type="email"
								rightSection={<IconAt size={16} />}
								error={fieldState.error?.message}
							/>
						)}
					/>
					<Space h="md" />
					<Controller
						name="password"
						control={control}
						rules={{ required: "Skriv in ett lösenord" }}
						render={({ field, fieldState }) => (
							<TextInput
								{...field}
								label="Lösenord"
								type="password"
								error={fieldState.error?.message}
							/>
						)}
					/>
					<Space h="md" />
					<Button type="submit">Logga in</Button>
				</form>
			</Container>
		</AppShell.Main>
	);
};

export default Login;
