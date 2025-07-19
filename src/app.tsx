import QueryClientWrapper from "@common/api/query-client-wrapper";
import ThemeWrapper from "@common/theme/theme-wrapper";

import { Router } from "./router";

const App = () => {
	return (
		<ThemeWrapper>
			<QueryClientWrapper>
				<Router />
			</QueryClientWrapper>
		</ThemeWrapper>
	);
};

export default App;
