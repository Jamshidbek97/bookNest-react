import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Products from "./Products";
import "../../../css/product.css";
import Recommendations from "./Recommendation";

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
          <Recommendations />
          Board RestaurantLocation
        </Route>
      </Switch>
    </div>
  );
}
