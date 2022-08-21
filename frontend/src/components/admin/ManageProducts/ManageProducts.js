import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Table, Box, Button, MediaQuery } from "@mantine/core";
import { connect } from "react-redux";

import Loading from "../../common/Loading";
import ProductRow from "./ProductRow";
import { getAllShopItems, removeAllShopItems } from "../../../actions/shopActions";

const ManageProducts = (props) => {
  useEffect(() => {
    props.getAllShopItems();

    return () => {
      props.removeAllShopItems();
    };
  }, []);

  let renderShopItems = <Loading />;
  if (props.shopItemsLoading && props.shopItems.length === 0) {
    renderShopItems = <Loading />;
  } else {
    renderShopItems = (
      <>
        <MediaQuery smallerThan="md" styles={{ textAlign: "left" }}>
          <Box sx={{ textAlign: "right" }} mb={8}>
            <Button variant="light" component={Link} to="/shop/add">
              Add New Product
            </Button>
          </Box>
        </MediaQuery>

        <Table highlightOnHover verticalSpacing="sm">
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Product</th>
              <th style={{ textAlign: "center" }}>Category</th>
              <th style={{ textAlign: "center" }}>Price</th>
              <th style={{ textAlign: "center" }}>Quantity</th>
              <th style={{ textAlign: "center" }}>Created At</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.shopItems.map((item) => (
              <ProductRow
                key={item._id}
                shopItem={item}
                deleteItemLoading={props.deleteItemLoading}
              />
            ))}
          </tbody>
        </Table>
      </>
    );
  }

  return (
    <Card withBorder shadow="md" mt={10} sx={{ overflowX: "scroll" }}>
      {renderShopItems}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    shopItems: state.shop.shopItems,
    deleteItemLoading: state.shop.deleteItemLoading,
    shopItemsLoading: state.shop.shopItemsLoading,
  };
};

export default connect(mapStateToProps, { getAllShopItems, removeAllShopItems })(ManageProducts);
