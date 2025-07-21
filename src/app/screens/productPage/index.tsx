import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Products from "./Products";
import Recommendations from "./Recommendation";
import Location from "./Location";
import Testimonials from "./Testimonials";
import ProductDetail from "./ProductDetail";
import "../../../css/product.css";
import { CartItem } from "../../../lib/types/search";

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function ProductsPage(props: ProductsProps) {
  const { onAdd } = props;
  const products = useRouteMatch();
  console.log("Products:", products);

  return (
    <div className="products-page">
      <Switch>
        <Route path={`${products.path}/:productId`}>
          <ProductDetail onAdd={onAdd} />
        </Route>

        <Route path="/products">
          <div className="products">
            <Products onAdd={onAdd} />
            <Recommendations />
            <Testimonials />
            <Location />
          </div>
        </Route>
      </Switch>
    </div>
  );
}
