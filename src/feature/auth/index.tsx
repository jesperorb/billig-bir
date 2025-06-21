import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useApiClient } from '@common/api/api-client-context';
import { AppShell } from '@mantine/core';

const LoginPage = () => {
	const apiClient = useApiClient();
	return (
		<AppShell.Main px="lg">
			<Auth
				view="sign_in"
				supabaseClient={apiClient}
				providers={[]}
				appearance={{ theme: ThemeSupa }}
				showLinks={false}
			/>
		</AppShell.Main>
	)
}

export default LoginPage;
