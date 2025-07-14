import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Products from "./Products";
import "../../../css/product.css";

// import { CartItem } from "../../../lib/types/search";

// interface ProductsPageProps {
//   onAdd: (item: CartItem) => void;
// }

export default function ProductsPage() {
  return (
    <div className="products">
      <Switch>
        <Route path={`products/:productId`}>ChosenProduct</Route>

        <Route>
          <Products />
          Board RestaurantLocation
        </Route>
      </Switch>
    </div>
  );
}
