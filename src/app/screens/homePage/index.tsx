import React from "react";
import Statistics from "./Statistics";
import "../../../css/home.css";
import PopularBooks from "./PopularBooks";

export default function HomePage() {
  return (
    <div className="homepage">
      <Statistics />
      <PopularBooks />
    </div>
  );
}
