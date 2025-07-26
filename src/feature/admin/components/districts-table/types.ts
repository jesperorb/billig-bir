import type { ReactNode } from "react";

import type { District } from "@common/types/district";

export interface DistrictsTableProps {
	data: District[] | undefined;
	isLoading?: boolean;
	actionColumn: {
		header: string;
		icon: ReactNode;
		onClick: (district: District) => void;
		ariaLabel: (district: District) => string;
	};
}
