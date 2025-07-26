import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useState, useCallback } from "react";

import { NotificationContext } from "./notification-context";
import type { NotificationState, NotificationType } from "./types";

interface NotificationProviderProps {
	children: React.ReactNode;
}

export const NotificationProvider = ({
	children,
}: NotificationProviderProps) => {
	const [notification, setNotification] = useState<
		NotificationState | undefined
	>(undefined);

	const showNotification = useCallback(
		(
			type: NotificationType,
			title: string,
			message: string,
			duration: number = type === "error" ? 3000 : 2000,
		) => {
			setNotification({ type, title, message });
			setTimeout(() => {
				setNotification(undefined);
			}, duration);
		},
		[],
	);

	return (
		<NotificationContext value={showNotification}>
			{children}
			{notification && (
				<Notification
					title={notification.title}
					color={notification.type === "error" ? "red" : "green"}
					styles={{
						root: {
							position: "fixed",
							top: "1rem",
							left: "1rem",
							right: "1rem",
							zIndex: 9999999,
							"@media (min-width: 768px)": {
								left: "auto",
								right: "2rem",
								top: "2rem",
								width: "auto",
								maxWidth: "400px",
							},
						},
					}}
					withBorder
					withCloseButton
					onClose={() => {
						setNotification(undefined);
					}}
					icon={notification.type === "success" ? <IconCheck /> : <IconX />}
				>
					{notification.message}
				</Notification>
			)}
		</NotificationContext>
	);
};
