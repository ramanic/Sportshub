import React from "react";
import {
  TextInput,
  Textarea,
  NumberInput,
  Card,
  Group,
  Box,
  Button,
  Title,
  Text,
  Container,
  Select,
} from "@mantine/core";
import Joi from "joi";
import { useForm, joiResolver } from "@mantine/form";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import UploadProductImages from "./UploadProductImages";
import { createShopItem } from "../../../actions/shopActions";

const schema = Joi.object({
  image: Joi.any(),
  name: Joi.string().required().messages({
    "string.empty": "Product name is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Product description is required",
  }),
  availableQty: Joi.number().required().positive().messages({
    "number.base": "Product quantity is required",
    "number.positive": "Product quantity should be positive",
  }),
  price: Joi.number().required().positive().messages({
    "number.base": "Price is required",
    "number.positive": "Product price should be positive",
  }),
  category: Joi.string().required().messages({
    "string.empty": "Product category is required",
  }),
});

const productCategories = ["Football", "Cricket", "Basketball", "Tennis", "Hockey"];

const EditProduct = (props) => {
  const navigate = useNavigate();

  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      image: null,
      name: "",
      description: "",
      availableQty: null,
      price: null,
      category: "",
    },
  });

  // Submit form for creating a new product
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      let productData = new FormData();
      Object.keys(form.values).forEach((value) => {
        if (value === "image") {
          // for (let i = 0; i < form.values.image.length; i++) {
          //   productData.append("image", form.values.image[i]);
          // }
          productData.append("image", form.values.image[0]);
        } else {
          productData.append([value], form.values[value]);
        }
      });

      props.createShopItem(productData, navigate);
    }
  };

  const onProductImageDrop = (images) => {
    form.setFieldValue("image", images);
  };

  const onProductImageReject = (a) => {
    console.log("File rejected");
  };

  return (
    <Card
      withBorder
      mx="auto"
      sx={{
        maxWidth: 600,
      }}
    >
      <Container>
        <Title order={4}>Add a product</Title>
        <Group grow mb="md" mt="md">
          <form onSubmit={formSubmitHandler}>
            <Group direction="column" grow>
              <TextInput
                placeholder="Name of the product"
                label="Product name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
                error={form.errors.name}
              />
              <Textarea
                placeholder="Description of the product"
                label="Product description"
                autosize
                maxRows={4}
                minRows={2}
                value={form.values.description}
                onChange={(event) => form.setFieldValue("description", event.currentTarget.value)}
                error={form.errors.description}
              />
              <NumberInput
                placeholder="Available quantity of the product"
                label="Product quantity"
                value={form.values.availableQty}
                onChange={(value) => form.setFieldValue("availableQty", value)}
                min={0}
                error={form.errors.availableQty}
              />
              <NumberInput
                placeholder="Price of the product"
                label="Product price"
                value={form.values.price}
                onChange={(value) => form.setFieldValue("price", value)}
                min={0}
                error={form.errors.price}
              />
              <Select
                label="Category of the product"
                placeholder="Product category"
                value={form.values.category}
                data={productCategories}
                onChange={(cat) => form.setFieldValue("category", cat)}
                transitionDuration={150}
                transition="pop-top-left"
                transitionTimingFunction="ease"
                searchable
                error={form.errors.category}
              />
              <Text size="sm" mb={-12}>
                Upload product images
              </Text>
              <UploadProductImages
                productImage={form.values.image}
                onProductImageDrop={onProductImageDrop}
                onProductImageReject={onProductImageReject}
                error={form.errors.image}
              />
            </Group>
            <Group mt={20}>
              <Button fullWidth type="submit" loading={props.createItemLoading}>
                Create
              </Button>
            </Group>
          </form>
        </Group>
      </Container>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    createItemLoading: state.shop.createItemLoading,
  };
};

export default connect(mapStateToProps, { createShopItem })(EditProduct);
