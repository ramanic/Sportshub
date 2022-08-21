import React from "react";

import BrowseProducts from "./BrowseProducts/BrowseProducts";
import ProductsFilter from "./ProductsFilter/ProductsFilter";

const Shop = () => {
  return (
    <>
      <ProductsFilter />
      <BrowseProducts />
    </>
  );
};

export default Shop;
