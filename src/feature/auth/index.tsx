import { AppShell, Button, Container, Space, TextInput } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useForm, Controller } from "react-hook-form";

import Layout from "@common/components/layout";
import { loginFn } from "src/routes/admin";

interface LoginFormData {
	email: string;
	password: string;
}

const Login = () => {
	const router = useRouter();
	const loginMutation = useMutation({
		mutationFn: loginFn,
		onSuccess: async (ctx) => {
			if (!ctx?.error) {
				await router.invalidate();
				router.navigate({ to: "/admin/view-beer-locations" });
				return;
			}
		},
	});

	const { control, handleSubmit } = useForm<LoginFormData>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async ({ email, password }: LoginFormData) => {
		await loginMutation.mutateAsync({
			data: {
				email,
				password,
			},
		});
	};

	return (
		<Layout>
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
		</Layout>
	);
};

export default Login;
