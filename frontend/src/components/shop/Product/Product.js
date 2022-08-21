import React, { useEffect } from "react";
import { Card, Divider } from "@mantine/core";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import ProductDetails from "./ProductDetails/ProductDetails";
import ProductReviews from "./ProductReviews/ProductReviews";
import NewReview from "./NewReview/NewReview";
import Loading from "../../common/Loading";
import { getShopItem } from "../../../actions/shopActions";
import isEmpty from "../../../utils/isEmpty";

const Product = (props) => {
  const params = useParams();
  useEffect(() => {
    props.getShopItem(params.productId);
  }, []);

  let renderShopItem = <Loading />;

  if (props.shopItemLoading) {
    renderShopItem = <Loading />;
  } else if (props.shopItem) {
    renderShopItem = (
      <>
        <ProductDetails shopItem={props.shopItem} user={props.user} />
        <Divider my="lg" />
        <NewReview
          newReviewLoading={props.shopItem}
          reviewShopItemLoading={props.reviewShopItemLoading}
          shopItemId={props.shopItem._id}
        />
        <Divider my="lg" />
        <ProductReviews
          reviews={props.shopItem.reviews.sort(function (a, b) {
            return new Date(b.reviewedAt) - new Date(a.reviewedAt);
          })}
        />
      </>
    );
  }

  return (
    <Card withBorder shadow="md">
      {renderShopItem}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    shopItem: state.shop.shopItem,
    shopItemLoading: state.shop.shopItemLoading,
    reviewShopItemLoading: state.shop.reviewShopItemLoading,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { getShopItem })(Product);
