import React, { useEffect, useState, useRef, useCallback } from "react";
import { Card, Text } from "@mantine/core";
import { connect } from "react-redux";

import Loading from "../../common/Loading";
import ProductsList from "./ProductsList/ProductsList";
import { getShopItems, sortShopItems, removeAllShopItems } from "../../../actions/shopActions";

const BrowseProducts = (props) => {
  const [sortBy, setSortBy] = useState("");

  const [pageNumber, setPageNumber] = useState(1);

  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (props.shopItemsLoading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pageNumber < props.totalPages) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [props.shopItemsLoading]
  );

  const productSortByHandler = (newSortBy) => {
    setSortBy(newSortBy);
    props.sortShopItems(newSortBy);
  };

  // Get shop items on component mount
  useEffect(() => {
    props.getShopItems(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    return () => {
      props.removeAllShopItems();
    };
  }, []);

  let renderProductsList = <Loading />;

  if (props.shopItemsLoading && props.shopItems.length === 0) {
    renderProductsList = <Loading />;
  } else {
    props.sortShopItems(sortBy);
    renderProductsList = (
      <ProductsList
        innerRef={lastPostElementRef}
        shopItems={props.shopItems}
        sortBy={sortBy}
        productSortByHandler={productSortByHandler}
        user={props.user}
      />
    );
  }

  return (
    <Card withBorder shadow="md">
      {renderProductsList}
      {props.shopItemsLoading && props.shopItems.length > 0 ? <Loading /> : null}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    shopItems: state.shop.shopItems,
    shopItemsLoading: state.shop.shopItemsLoading,
    totalPages: state.shop.totalPages,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { getShopItems, sortShopItems, removeAllShopItems })(
  BrowseProducts
);
