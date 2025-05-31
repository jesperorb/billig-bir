import { createContext, use } from "react";

import { PriceType } from "../types/filters";

export const PriceTypeContext = createContext<PriceType>("price");
export const usePriceType = () => use(PriceTypeContext);
