import { createContext, use } from "react";

import { PriceType } from "@common/types/common";
import { noop } from "@common/utils/function";

export const PriceTypeContext = createContext<PriceType>("price");
export const SetPriceTypeContext =
	createContext<(type: PriceType) => void>(noop);
export const usePriceType = () => use(PriceTypeContext);
export const useSetPriceType = () => use(SetPriceTypeContext);
