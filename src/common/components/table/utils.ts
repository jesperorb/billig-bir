import type { Column } from "@tanstack/react-table";
import type { CSSProperties } from "react";

export const getCommonPinningStyles = <Type extends object>(
	column: Column<Type>,
): CSSProperties => {
	const isPinned = column.getIsPinned();
	const isLastLeftPinnedColumn =
		isPinned === "left" && column.getIsLastColumn("left");
	const isFirstRightPinnedColumn =
		isPinned === "right" && column.getIsFirstColumn("right");

	return {
		boxShadow: isLastLeftPinnedColumn
			? "-4px 0 4px -4px gray inset"
			: isFirstRightPinnedColumn
				? "4px 0 4px -4px gray inset"
				: undefined,
		left:
			isPinned === "left"
				? `${column.getStart("left").toString()}px`
				: undefined,
		right:
			isPinned === "right"
				? `${column.getAfter("right").toString()}px`
				: undefined,
		opacity: isPinned ? 0.95 : 1,
		position: isPinned ? "sticky" : "relative",
		width: column.getSize(),
		zIndex: isPinned ? 1 : 0,
	};
};
