import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularBooks from "./PopularBooks";
import NewBooks from "./NewBooks";
import BookOfTheMonth from "./BookOfTheMonth";
import SpotlightMembers from "./SpotlightMembers";
import CallToAction from "./CTA";
import { Dispatch } from "@reduxjs/toolkit";
import { Book } from "../../../lib/types/product";
import { setNewBooks, setPopularBooks, setSpotlightMembers } from "./slice";
import { useDispatch } from "react-redux";
import ProductService from "../../services/Product.Service";
import { BookGenre } from "../../../lib/enums/book.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css";

/** REDUX SLICE AND SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularBooks: (data: Book[]) => dispatch(setPopularBooks(data)),
  setNewBooks: (data: Book[]) => dispatch(setNewBooks(data)),
  setSpotlightMembers: (data: Member[]) => dispatch(setSpotlightMembers(data)),
});

export default function HomePage() {
  const { setPopularBooks, setNewBooks, setSpotlightMembers } = actionDispatch(
    useDispatch()
  );

  useEffect(() => {
    console.log("Use effect triggered [1]");
    const product = new ProductService();
    console.log("[2] ProductService created:", product);
    console.log("Product", product);

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "bookViews",
        // genre: BookGenre.BIOGRAPHY,
      })
      .then((data) => {
        console.log("[3] Fetched popular books:", data);
        setPopularBooks(data);
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
      })
      .then((data) => setNewBooks(data))
      .catch((err) => console.log("[❌] Error fetching popular books", err));

    const member = new MemberService();
    member
      .getSpotlightMembers()
      .then((data) => setSpotlightMembers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="homepage">
      <Statistics />
      <PopularBooks />
      <NewBooks />
      <BookOfTheMonth />
      <SpotlightMembers />
      <CallToAction />
    </div>
  );
}
