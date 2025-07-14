import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

const books = [
  {
    _id: "686eb04726452961595003da",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "FICTION",
    price: 20,
    coverImages: ["img/default-book.jpg"],
  },
  {
    _id: "2",
    title: "1984",
    author: "George Orwell",
    genre: "DYSTOPIAN",
    price: 18,
    coverImages: ["img/default-book.jpg"],
  },
  {
    _id: "3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "ROMANCE",
    price: 22,
    coverImages: ["img/default-book.jpg"],
  },
  {
    _id: "4",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "CLASSIC",
    price: 15,
    coverImages: ["img/default-book.jpg"],
  },
];

export default function PopularBooks() {
  return (
    <div className="popular-books">
      <h2 className="section-title">🔥 Popular Books</h2>
      <div className="book-card-container">
        {books.map((book) => (
          <div className="book-card" key={book._id}>
            <div className="image-wrapper">
              <img
                className="book-cover"
                src={`/${book.coverImages[0]}`}
                alt={book.title}
              />
              <div className="hover-icons">
                <span className="icon left" title="Like">
                  ❤️
                </span>
                <span className="icon center" title="Add to cart">
                  🛒
                </span>
                <span className="icon right" title="View">
                  👁️
                </span>
              </div>
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p className="author">{book.author}</p>
              <p className="genre">{book.genre}</p>
              <p className="price">${book.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
