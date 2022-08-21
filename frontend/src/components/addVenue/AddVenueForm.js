import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
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
import { useNavigate } from "react-router-dom";
import { IoCheckmarkOutline, IoAddOutline } from "react-icons/io5";
import { useForm, joiResolver } from "@mantine/form";
import Joi from "joi";

import UploadVenueImages from "./UploadVenueImages";
import SelectLocation from "./SelectLocation";
import { createNewVenue } from "../../actions/venueActions";

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
  highlights: Joi.array().min(1).messages({
    "array.min": "Write at least one highlight",
  }),
  district: Joi.string().required().messages({
    "string.empty": "Address is required",
  }),
  city: Joi.string().required().messages({
    "string.empty": "Address is required",
  }),
});

const AddVenueForm = (props) => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [highlightItem, setHighlightItem] = useState("");

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
      highlights: [],
      district: "",
      city: "",
    },
  });

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
        } else if (value === "highlights") {
          venueData.append([value], JSON.stringify(form.values[value]));
        } else {
          venueData.append([value], form.values[value]);
        }
      });
      venueData.append(
        "location",
        JSON.stringify({ latitude: viewState.latitude, longitude: viewState.longitude })
      );
      props.createNewVenue(venueData, navigate);
    }
  };

  const onVenueImageDrop = (images) => {
    form.setFieldValue("images", images);
  };

  const onVenueImageReject = () => {
    console.log("File rejected");
  };

  const highlightItemAddHandler = () => {
    if (highlightItem.length > 0) {
      form.setFieldValue("highlights", [...form.values.highlights, highlightItem]);
      setHighlightItem("");
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setViewState({
          ...viewState,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (err) => console.log(err),
      { enableHighAccuracy: true }
    );
  }, [navigator]);

  return (
    <Card withBorder mx="auto" sx={{ maxWidth: 600 }}>
      <Title order={4}>Add a New Venue</Title>

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
              onChange={(value) => form.setFieldValue("category", value)}
              transitionDuration={150}
              transition="pop-top-left"
              transitionTimingFunction="ease"
              error={form.errors.category}
            />

            <Text size="sm" mb={-18}>
              Venue highlights
            </Text>
            <List icon={<IoCheckmarkOutline size={14} color={theme.colors.primary[6]} />}>
              {form.values.highlights.map((highlight) => (
                <List.Item
                  key={highlight}
                  sx={{ fontSize: "90%", color: theme.colors.primary[6], marginTop: 4 }}
                >
                  {highlight}
                </List.Item>
              ))}

              <Group align="center" mt={8}>
                <TextInput
                  value={highlightItem}
                  onChange={(event) => setHighlightItem(event.currentTarget.value)}
                  error={form.errors.highlights}
                  sx={{ flexGrow: 1 }}
                />
                <ActionIcon variant="light" color="primary" onClick={highlightItemAddHandler}>
                  <IoAddOutline size={18} />
                </ActionIcon>
              </Group>
            </List>
            <Text size="sm" mt={0} mb={-12}>
              Venue photos
            </Text>
            <UploadVenueImages
              venueImages={form.values.images}
              onVenueImageDrop={onVenueImageDrop}
              onVenueImageReject={onVenueImageReject}
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
                onChange={(cit) => form.setFieldValue("city", cit)}
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
            <Button fullWidth type="submit" loading={props.createVenueLoading}>
              Create
            </Button>
          </Group>
        </form>
      </Group>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    createVenueLoading: state.venue.createVenueLoading,
  };
};

export default connect(mapStateToProps, { createNewVenue })(AddVenueForm);
