import { AppRootState } from "../../../lib/types/screen";
import { createSelector } from "reselect";

const selectHomePage = (state: AppRootState) => state.homePage;
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
