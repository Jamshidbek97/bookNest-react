import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  popularBooks: [],
  newBooks: [],
  spotlightMembers: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularBooks: (state, action) => {
      console.log("[4] setPopularBooks reducer hit");
      console.log("🔥 Setting popularBooks", action.payload);
      state.popularBooks = action.payload;
    },
    setNewBooks: (state, action) => {
      state.newBooks = action.payload;
    },
    setSpotlightMembers: (state, action) => {
      state.spotlightMembers = action.payload;
    },
  },
});

export const { setNewBooks, setPopularBooks, setSpotlightMembers } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
