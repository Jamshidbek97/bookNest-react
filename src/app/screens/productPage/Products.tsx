import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box } from "@mui/material";

const booksData = [
  {
    _id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "FICTION",
    badge: "hot",
    description: "Describe this book with 50 words",
    price: 19,
    bookLikes: 22,
    coverImages: "img/default-book.jpg",
  },
  {
    _id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    genre: "SELF-HELP",
    price: 25,
    bookLikes: 8,
    description: "Describe this book with 50 words",

    coverImages: "img/default-book.jpg",
  },
  {
    _id: "3",
    title: "Educated",
    author: "Tara Westover",
    genre: "MEMOIR",
    badge: "bestseller",
    price: 21,
    bookLikes: 31,
    description: "Describe this book with 50 words",

    coverImages: "img/default-book.jpg",
  },
  {
    _id: "4",
    title: "Dune",
    author: "Frank Herbert",
    genre: "SCI-FI",
    price: 24,
    description: "Describe this book with 50 words",

    bookLikes: 10,
    coverImages: "img/default-book.jpg",
  },
];

export default function Products() {
  const [search, setSearch] = useState("");

  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-page">
      <h1 className="page-title">BookNest Collection</h1>

      {/* Top Search + Sort */}
      <div className="top-controls">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <div className="sort-buttons">
          <button className="sort-button">Newest</button>
          <button className="sort-button">Price</button>
          <button className="sort-button">Popularity</button>
        </div>
      </div>

      {/* Genre Filter */}
      <div className="left-filters">
        {["Fiction", "Mystery", "Romance", "Sci-Fi", "Biography"].map(
          (genre) => (
            <button key={genre} className="filter-button">
              {genre}
            </button>
          )
        )}
      </div>

      {/* Book Grid or Empty State */}
      <div className="products">
        {filteredBooks.length === 0 ? (
          <div className="no-products">
            <img src="/images/empty-books.png" alt="No books" />
            <p>No books found!</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredBooks.map((book) => (
              <div key={book._id} className="book-card">
                <div className="image-wrapper">
                  <img src={book.coverImages} alt={book.title} />
                  {book.badge && (
                    <span className={`badge badge-${book.badge.toLowerCase()}`}>
                      {book.badge}
                    </span>
                  )}
                  <div className="hover-overlay">
                    <button className="basket-btn">
                      <ShoppingCartIcon style={{ fontSize: 24 }} />
                    </button>
                  </div>
                </div>
                <div className="card-text">
                  <h3>{book.title}</h3>
                  <p className="author">by {book.author}</p>
                  <p className="description">
                    {book.description.slice(0, 50)}...
                  </p>
                  <p className="price">${book.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button>{`←`}</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>{`→`}</button>
      </div>
    </div>
  );
}
