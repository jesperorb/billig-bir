import { createContext, use } from "react";

import { PriceType } from "@feature/map/filters";

export const PriceTypeContext = createContext<PriceType>("price");
export const SetPriceTypeContext = createContext<(type: PriceType) => void>(() => {});
export const usePriceType = () => use(PriceTypeContext);
export const useSetPriceType = () => use(SetPriceTypeContext);
