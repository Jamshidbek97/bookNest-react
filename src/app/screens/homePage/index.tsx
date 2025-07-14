import React from "react";
import Statistics from "./Statistics";
import "../../../css/home.css";
import PopularBooks from "./PopularBooks";
import NewBooks from "./NewBooks";

export default function HomePage() {
  return (
    <div className="homepage">
      <Statistics />
      <PopularBooks />
      <NewBooks />
    </div>
  );
}
