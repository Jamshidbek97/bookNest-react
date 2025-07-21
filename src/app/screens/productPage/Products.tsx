import { ChangeEvent, useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Dispatch } from "@reduxjs/toolkit";
import { Book, BookInquiry } from "../../../lib/types/product";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import { createSelector } from "reselect";
import { CartItem } from "../../../lib/types/search";
import { useDispatch, useSelector } from "react-redux";
import { BookGenre } from "../../../lib/enums/book.enum";
import { useHistory } from "react-router-dom";
import ProductService from "../../services/Product.Service";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE && SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Book[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products: any) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<BookInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    search: "",
  });

  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  const searchGenreHandler = (genre: BookGenre) => {
    productSearch.page = 1;
    productSearch.genre = genre;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    productSearch.genre = undefined;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDetailHandler = (id: string) => {
    history.push(`/products/${id}`);
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
                <div key={book._id} className="book-card">
                  <div className="image-wrapper">
                    <img src={imageSrc} alt={book.title} />

                    {badge && (
                      <span className={`badge badge-${badge.toLowerCase()}`}>
                        {badge}
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
              );
            })}
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
