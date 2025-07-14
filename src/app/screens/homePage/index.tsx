import React from "react";
import Statistics from "./Statistics";
import PopularBooks from "./PopularBooks";
import NewBooks from "./NewBooks";
import BookOfTheMonth from "./BookOfTheMonth";
import SpotlightMembers from "./SpotlightMembers";
import "../../../css/home.css";

export default function HomePage() {
  return (
    <div className="homepage">
      <Statistics />
      <PopularBooks />
      <NewBooks />
      <BookOfTheMonth />
      <SpotlightMembers />
    </div>
  );
}
