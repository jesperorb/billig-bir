import { use } from "react";

import { NotificationContext } from "./notification-context";

export const useNotification = () => {
	const context = use(NotificationContext);
	if (context === undefined) {
		throw new Error(
			"useNotification must be used within a NotificationProvider",
		);
	}
	return context;
};
