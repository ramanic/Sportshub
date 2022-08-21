import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Button,
  Text,
  Title,
  Group,
  Box,
  Container,
  TextInput,
  NumberInput,
  Textarea,
  List,
  MultiSelect,
  Select,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import Joi from "joi";
import { useForm, joiResolver } from "@mantine/form";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import EditVenueImages from "./EditVenueImages";
import SelectLocation from "./SelectLocation";
import Loading from "../../common/Loading";
import { getVenue, editVenue } from "../../../actions/venueActions";

const venueCategories = ["Football", "Cricket", "Tennis", "Basketball", "Hockey"];

const Nepal = require("nepal-js");

const schema = Joi.object({
  images: Joi.any(),
  name: Joi.string().required().messages({
    "string.empty": "Venue name is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Venue description is required",
  }),
  category: Joi.string().required().messages({
    "string.empty": "Select a category",
  }),

  district: Joi.string().required().messages({
    "string.empty": "Address is required",
  }),
  city: Joi.string().required().messages({
    "string.empty": "Address is required",
  }),
});

const EditVenue = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [viewState, setViewState] = useState({
    latitude: null,
    longitude: null,
    zoom: 12,
  });

  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      images: null,
      name: "",
      description: "",
      category: "",
      district: "",
      city: "",
    },
  });

  // Load form with venue values
  useEffect(() => {
    props.getVenue(params.venueId);
  }, []);

  useEffect(() => {
    if (props.currentVenue && props.currentVenue._id === params.venueId) {
      form.setValues({
        name: props.currentVenue.name,
        description: props.currentVenue.description,
        category: props.currentVenue.category,
        district: props.currentVenue.address.district,
        city: props.currentVenue.address.city,
      });
      setViewState({
        latitude: Number(props.currentVenue.location.latitude),
        longitude: Number(props.currentVenue.location.longitude),
        zoom: 12,
      });
    }
  }, [props.currentVenue]);

  // Submit form for creating a new venue
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();

    if (!hasErrors && viewState.latitude && viewState.longitude) {
      let venueData = new FormData();
      Object.keys(form.values).forEach((value) => {
        if (value === "images") {
          for (let i = 0; i < form.values.images.length; i++) {
            venueData.append("images", form.values.images[i]);
          }
        } else {
          venueData.append([value], form.values[value]);
        }
      });
      venueData.append(
        "location",
        JSON.stringify({ latitude: viewState.latitude, longitude: viewState.longitude })
      );
      props.editVenue(venueData, props.currentVenue._id, navigate);
    }
  };

  const onVenueImageDrop = (images) => {
    form.setFieldValue("images", images);
  };

  const onVenueImageReject = () => {
    console.log("File rejected");
  };

  return (
    <Card withBorder mx="auto" sx={{ maxWidth: 600 }}>
      <Title order={4}>Edit your venue</Title>

      {props.venueLoading || !props.currentVenue ? (
        <Loading />
      ) : (
        <Group grow mb="md" mt="md">
          <form onSubmit={formSubmitHandler}>
            <Group direction="column" grow>
              <TextInput
                placeholder="Name of the venue"
                label="Venue name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
                error={form.errors.name}
              />
              <Textarea
                placeholder="Description of the venue"
                label="Venue description"
                autosize
                maxRows={4}
                minRows={2}
                value={form.values.description}
                onChange={(event) => form.setFieldValue("description", event.currentTarget.value)}
                error={form.errors.description}
              />
              <Select
                label="Select venue category"
                placeholder="Venue category"
                data={venueCategories}
                searchable
                value={form.values.category}
                onChange={(value) => form.setFieldValue("category", value)}
                transitionDuration={150}
                transition="pop-top-left"
                transitionTimingFunction="ease"
                error={form.errors.category}
              />

              <Text size="sm" mt={0} mb={-12}>
                Venue photos
              </Text>
              <EditVenueImages
                venueImage={form.values.images}
                onVenueImageDrop={onVenueImageDrop}
                onVenueImageReject={onVenueImageReject}
                prevImageLink={props.currentVenue.images}
              />
            </Group>
            <Text size="sm" mt={14} mb={6}>
              Address
            </Text>
            <Group grow>
              <Select
                placeholder="District"
                value={form.values.district}
                data={Object.keys(Nepal.Districts)}
                onChange={(dis) => form.setFieldValue("district", dis)}
                transitionDuration={150}
                transition="pop-top-left"
                transitionTimingFunction="ease"
                searchable
                error={form.errors.district || form.errors.city}
              />
              {form.values.district.length > 0 ? (
                <Select
                  searchable
                  placeholder="City"
                  value={form.values.city}
                  data={Object.keys(Nepal.getCitiesByDistrict(form.values.district))}
                  onChange={(city) => form.setFieldValue("city", city)}
                  transitionDuration={150}
                  transition="pop-top-left"
                  transitionTimingFunction="ease"
                  error={form.errors.district || form.errors.city}
                />
              ) : null}
            </Group>
            <Text size="sm" mt={16} mb={8}>
              Exact location
            </Text>
            <Group grow>
              {viewState.latitude && viewState.longitude ? (
                <SelectLocation viewState={viewState} setViewState={setViewState} />
              ) : null}
            </Group>
            <Group mt={26}>
              <Button fullWidth type="submit" loading={props.editVenueLoading}>
                Create
              </Button>
            </Group>
          </form>
        </Group>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    currentVenue: state.venue.currentVenue,
    editVenueLoading: state.venue.editVenueLoading,
    venueLoading: state.venue.venueLoading,
  };
};

export default connect(mapStateToProps, { getVenue, editVenue })(EditVenue);
