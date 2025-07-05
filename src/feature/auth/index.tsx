import { useApiClient } from '@common/api/api-client-context';
import { AppShell, Button, Container, Space, TextInput } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { useNavigate } from '@tanstack/react-router';
import { useState, type FormEventHandler } from 'react';

const FIELD_NAMES = {
	email: "email",
	password: "password",
} as const;

type FieldNames = keyof typeof FIELD_NAMES;

const DEFAULT_ERRORS: Partial<Record<FieldNames, string>> = {
	email: "",
	password: "",
}

const LoginPage = () => {
	const apiClient = useApiClient();
	const navigate = useNavigate()
	const [errors, setErrors] = useState(DEFAULT_ERRORS);

	const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		setErrors(DEFAULT_ERRORS)
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get(FIELD_NAMES.email)?.toString();
		const password = formData.get(FIELD_NAMES.password)?.toString();
		if (!email || !password) {
			setErrors({
				email: !email ? "Skriv in en email" : "",
				password: !password ? "Skriv in ett lösenord" : ""
			})
			return;
		}
		const response = await apiClient.auth.signInWithPassword({
			email,
			password,
		})
		if (response.data.user) {
			navigate({ to: "/admin" })
		}
	}

	return (
		<AppShell.Main px="lg">
			<Container size={400}>
				<Space h="md" />
				<form onSubmit={onSubmit}>
					<TextInput
						label="Email"
						type="email"
						rightSection={<IconAt size={16} />}
						error={errors.email}
					/>
					<Space h="md" />
					<TextInput
						label="Lösenord"
						type="password"
						error={errors.password}
					/>
					<Space h="md" />
					<Button type="submit">
						Logga in
					</Button>
				</form>
			</Container>
		</AppShell.Main>
	)
}

export default LoginPage;
