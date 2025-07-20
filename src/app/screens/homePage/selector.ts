import { AppRootState } from "../../../lib/types/screen";
import { createSelector } from "reselect";
import { RootState } from "../../store";

const selectHomePage = (state: RootState) => state.homePage;
export const retrievePopularBooks = createSelector(
  selectHomePage,
  (HomePage) => HomePage.popularBooks
);

export const retrieveNewBooks = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newBooks
);

export const retrieveSpotlightMembers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.spotlightMembers
);
