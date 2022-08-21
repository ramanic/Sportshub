import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ScrollArea, Box } from "@mantine/core";

import ShopContent from "./ShopContent/ShopContent";
import UserContent from "./UserContent/UserContent";

import { getRecommendedProducts, getRecommendedUsers } from "../../../actions/userActions";

const RightContent = (props) => {
  useEffect(() => {
    if (props.isAuthenticated) {
      props.getRecommendedProducts();
      props.getRecommendedUsers();
    }
  }, [props.isAuthenticated]);

  return (
    <Box sx={{ position: "sticky" }} className="right-content-sticky-mt">
      {props.isAuthenticated ? (
        <ScrollArea style={{ height: "82vh" }}>
          <UserContent
            recommendedUsers={props.recommendedUsers}
            recommendedUsersLoading={props.recommendedUsersLoading}
            user={props.user}
          />
          <ShopContent
            recommendedProductsLoading={props.recommendedProductsLoading}
            recommendedProducts={props.recommendedProducts}
          />
        </ScrollArea>
      ) : null}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    recommendedProducts: state.user.recommendedProducts,
    recommendedProductsLoading: state.user.recommendedProductsLoading,
    recommendedUsers: state.user.recommendedUsers,
    recommendedUsersLoading: state.user.recommendedUsersLoading,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { getRecommendedProducts, getRecommendedUsers })(
  RightContent
);
