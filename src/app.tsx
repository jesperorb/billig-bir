import QueryClientWrapper from "@common/api/query-client-wrapper";
import { NotificationProvider } from "@common/notifications/notification-provider";
import ThemeWrapper from "@common/theme/theme-wrapper";

import { Router } from "./router";

const App = () => {
	return (
		<ThemeWrapper>
			<QueryClientWrapper>
				<NotificationProvider>
					<Router />
				</NotificationProvider>
			</QueryClientWrapper>
		</ThemeWrapper>
	);
};

export default App;
