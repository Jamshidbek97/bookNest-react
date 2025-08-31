import { ChangeEvent, useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Dispatch } from "@reduxjs/toolkit";
import { Book, BookInquiry } from "../../../lib/types/product";
import { setAlsoLike, setProductDetail, setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import { createSelector } from "reselect";
import { CartItem } from "../../../lib/types/search";
import { useDispatch, useSelector } from "react-redux";
import { BookGenre } from "../../../lib/enums/book.enum";
import { useNavigate } from "react-router-dom";
import ProductService from "../../services/Product.Service";
import { serverApi } from "../../../lib/config";
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

/** REDUX SLICE && SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Book[]) => dispatch(setProducts(data)),
  setAlsoLike: (data: Book[]) => dispatch(setAlsoLike(data)),
  // setProductDetail: (data: Book[]) => dispatch(setProductDetail(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products: any) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const [selectedGenre, setSelectedGenre] = useState<BookGenre | undefined>();

  const { onAdd } = props;
  const { setProducts, setAlsoLike } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<BookInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    genre: undefined,
    search: "",
  });

  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 40,
        order: "createdAt",
      })
      .then((data) => setAlsoLike(data))
      .catch((err) => console.log("[❌] Error fetching popular books", err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      setProductSearch((prev) => ({
        ...prev,
        page: 1,
        search: "",
      }));
    }
  }, [searchText]);

  const searchGenreHandler = (genre: BookGenre | undefined) => {
    setSelectedGenre(genre);
    setProductSearch((prev) => ({
      ...prev,
      page: 1,
      genre,
      search: "",
    }));
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    setSelectedGenre(undefined);
    setProductSearch((prev) => ({
      ...prev,
      page: 1,
      genre: undefined,
      search: searchText.trim(),
    }));
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  return (
    <div className="products-page">
      <h1 className="page-title">BookNest Collection</h1>

      {/* Top Search + Sort */}
      <div className="top-controls">
        <input
          type="text"
          placeholder="Search books..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || "enter") searchProductHandler();
          }}
          className="search-input"
        />
        <div className="sort-buttons">
          <button
            className="sort-button"
            onClick={() => searchOrderHandler("createdAt")}
          >
            Newest
          </button>
          <button
            className="sort-button"
            onClick={() => searchOrderHandler("price")}
          >
            Price
          </button>
          <button
            className="sort-button"
            onClick={() => searchOrderHandler("bookViews")}
          >
            Popularity
          </button>
        </div>
      </div>

      {/* Genre Filter */}
      <div className="left-filters">
        {["All", "Fiction", "Mystery", "Romance", "Sci-Fi", "Biography"].map(
          (genreStr) => {
            const isAll = genreStr === "All";
            const genreEnum: any = isAll
              ? undefined
              : BookGenre[
                  genreStr
                    .toUpperCase()
                    .replace("-", "_") as keyof typeof BookGenre
                ];

            return (
              <button
                key={genreStr}
                className={`filter-button ${
                  selectedGenre === genreEnum || (isAll && !selectedGenre)
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  searchGenreHandler(genreEnum);
                  console.log(genreEnum);
                }}
              >
                {genreStr}
              </button>
            );
          }
        )}
      </div>

      {/* Book Grid or Empty State */}
      <div className="products">
        {products.length === 0 ? (
          <div className="no-products">
            <img src="/img/empty.jpg" alt="No books" />
            <p>No books found!</p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((book: any) => {
              const imageSrc = `${serverApi}/${
                book.coverImages?.[0] || "img/default-book.jpg"
              }`;

              let badge;
              if (book.bookLikes > 1) {
                badge = "BESTSELLER";
              } else if (book.bookViews > 1) {
                badge = "HOT";
              }
              return (
                <div
                  key={book._id}
                  onClick={() => navigate(`/product/${book._id}`)}
                  style={{ cursor: "pointer" }}
                  className="book-card"
                >
                  <div className="image-wrapper">
                    <img src={imageSrc} alt={book.title} />

                    {badge && (
                      <span className={`badge badge-${badge.toLowerCase()}`}>
                        {badge}
                      </span>
                    )}
                    <div className="hover-overlay">
                      <button
                        className="basket-btn"
                        onClick={(e) => {
                          onAdd({
                            _id: book._id,
                            quantity: 1,
                            title: book.title,
                            price: book.price,
                            coverImage: imageSrc,
                          });
                          console.log("Button clicked");
                          e.stopPropagation();
                        }}
                      >
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
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        className="pagination"
        count={
          products.length !== 0 ? productSearch.page + 1 : productSearch.page
        }
        page={productSearch.page}
        color="secondary"
        onChange={paginationHandler}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            slots={{
              previous: ArrowBack,
              next: ArrowForward,
            }}
          />
        )}
      />
    </div>
  );
}
