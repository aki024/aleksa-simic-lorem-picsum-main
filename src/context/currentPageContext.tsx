import { createContext } from "react";
import { CurrentPage } from "../models/Picture.model";

export const CurrentPageContext = createContext<CurrentPage>({
  currentPage: 0,
  setCurrentPage: () => {},
});
