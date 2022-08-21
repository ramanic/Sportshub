import React, { useState, useEffect } from "react";
import {
  Card,
  Group,
  Button,
  Text,
  Title,
  TextInput,
  RadioGroup,
  Radio,
  Textarea,
  MultiSelect,
  Select,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import Joi from "joi";
import { useForm, joiResolver } from "@mantine/form";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import UploadProfilePicture from "./UploadProfilePicture";
import SelectLocation from "./SelectLocation";
import { completeProfile } from "../../../actions/profileActions";

const Nepal = require("nepal-js");

const schema = Joi.object({
  profilePicture: Joi.allow(null),
  dateOfBirth: Joi.date().required().messages({
    "date.base": "Birth date is required",
  }),
  phone: Joi.string().min(10).max(10).required().messages({
    "string.empty": "Phone number is required",
    "string.min": "Invalid phone number",
    "string.max": "Invalid phone number",
  }),
  bio: Joi.string().allow(""),
  preferences: Joi.array(),
  gender: Joi.string().required().messages({
    "string.empty": "Gender is required",
  }),
  district: Joi.string().required().messages({
    "string.empty": "Address is required",
  }),
  city: Joi.string().required().messages({
    "string.empty": "Address is required",
  }),
});

const CompleteProfile = (props) => {
  const navigate = useNavigate();

  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      profilePicture: null,
      dateOfBirth: null,
      gender: "",
      phone: "",
      bio: "",
      preferences: [],
      district: "",
      city: "",
    },
  });

  const [viewState, setViewState] = useState({
    latitude: null,
    longitude: null,
    zoom: 12,
  });
  const [sportsPreferences, setSportsPreferences] = useState([
    "Cricket",
    "Football",
    "Tennis",
    "Basketball",
  ]);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      console.log(form.values);
      let profileData = new FormData();
      Object.keys(form.values).forEach((value) => {
        if (value === "profilePicture") {
          profileData.append("image", form.values.profilePicture[0]);
        } else if (value === "preferences") {
          profileData.append([value], JSON.stringify(form.values[value]));
        } else {
          profileData.append([value], form.values[value]);
        }
      });
      props.completeProfile(profileData, navigate, "/home");
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

  const onProfilePictureDrop = (image) => {
    form.setFieldValue("profilePicture", image);
  };

  const onProfilePictureReject = (a) => {
    console.log("File rejected");
  };

  return (
    <Card
      withBorder
      mx="auto"
      p={26}
      sx={{
        maxWidth: 600,
      }}
    >
      <Title order={4}>Complete your profile</Title>
      <form onSubmit={formSubmitHandler}>
        <UploadProfilePicture
          profilePicture={form.values.profilePicture}
          onProfilePictureDrop={onProfilePictureDrop}
          onProfilePictureReject={onProfilePictureReject}
        />
        <Group direction="column" grow>
          <DatePicker
            placeholder="Your date of birth"
            label="Date of Birth"
            value={form.values.dateOfBirth}
            onChange={(dateValue) => form.setFieldValue("dateOfBirth", dateValue)}
            error={form.errors.dateOfBirth}
          />
          <TextInput
            placeholder="Your phone number"
            label="Phone Number"
            value={form.values.phone}
            onChange={(event) => form.setFieldValue("phone", event.currentTarget.value)}
            error={form.errors.phone}
          />
          <RadioGroup
            label="Select your gender"
            value={form.values.gender}
            spacing="xl"
            size="sm"
            onChange={(genderValue) => form.setFieldValue("gender", genderValue)}
            error={form.errors.gender}
          >
            <Radio value="male" label="Male" size="xs" />
            <Radio value="female" label="Female" size="xs" />
            <Radio value="other" label="Other" size="xs" />
          </RadioGroup>
          <Textarea
            placeholder="Your bio"
            label="Bio"
            value={form.values.bio}
            onChange={(event) => form.setFieldValue("bio", event.currentTarget.value)}
            autosize
            maxRows={5}
            minRows={2}
          />
          <MultiSelect
            label="Sports preferences"
            placeholder="Your sports preferences"
            data={sportsPreferences}
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => setSportsPreferences((current) => [...current, query])}
            onChange={(sportsValue) => form.setFieldValue("preferences", sportsValue)}
            transitionDuration={150}
            transition="pop-top-left"
            transitionTimingFunction="ease"
          />

          <Text size="sm" mb={-10}>
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

          {/* {viewState.latitude && viewState.longitude ? (
            <SelectLocation viewState={viewState} setViewState={setViewState} />
          ) : null} */}
        </Group>
        <Group mt={30} position="right">
          <Button variant="outline" component={Link} to="/home" color="red">
            Skip
          </Button>
          <Button type="submit" loading={props.profile.completeMyProfileLoading}>
            Complete
          </Button>
        </Group>
      </form>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { completeProfile })(CompleteProfile);
