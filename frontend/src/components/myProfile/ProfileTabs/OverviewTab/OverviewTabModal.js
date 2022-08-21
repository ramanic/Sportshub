import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Modal,
  Button,
  Group,
  TextInput,
  Radio,
  Textarea,
  RadioGroup,
  Text,
  Select,
  MultiSelect,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, joiResolver } from "@mantine/form";
import Joi from "joi";

import EditProfilePicture from "./EditProfilePicture";
import { completeProfile } from "../../../../actions/profileActions";

const Nepal = require("nepal-js");

const schema = Joi.object({
  image: Joi.allow(null),
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  username: Joi.string().required().messages({
    "string.empty": "Username is required",
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email is invalid",
    }),

  // dateOfBirth: Joi.date().required().messages({
  //   "date.base": "Birth date is required",
  // }),
  dateOfBirth: Joi.allow(null),
  phone: Joi.string().min(10).max(10).required().messages({
    "string.empty": "Phone number is required",
    "string.min": "Invalid phone number",
    "string.max": "Invalid phone number",
  }),
  gender: Joi.allow(""),
  // gender: Joi.string().required().messages({
  //   "string.empty": "Gender is required",
  // }),
  district: Joi.string().required().messages({
    "string.empty": "Address is required",
  }),
  city: Joi.string().required().messages({
    "string.empty": "Address is required",
  }),
  bio: Joi.allow(""),
  preferences: Joi.array(),
});

const OverviewTabModal = (props) => {
  const navigate = useNavigate();

  const [sportsPreferences, setSportsPreferences] = useState([
    "Cricket",
    "Football",
    "Tennis",
    "Basketball",
  ]);

  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      image: null,
      name: "",
      username: "",
      email: "",
      dateOfBirth: null,
      phone: "",
      bio: "",
      gender: "",
      district: "",
      city: "",
      bio: "",
      preferences: [],
    },
  });

  // Load initial form values
  useEffect(() => {
    form.setValues({
      name: props.myProfile.name,
      username: props.myProfile.username,
      email: props.myProfile.email,
      phone: props.myProfile.profile.phone ? props.myProfile.profile.phone : "",
      bio: props.myProfile.profile.bio ? props.myProfile.profile.bio : "",
      city: props.myProfile.profile.address?.city ? props.myProfile.profile.address.city : "",
      district: props.myProfile.profile.address?.district
        ? props.myProfile.profile.address.district
        : "",
      preferences: props.myProfile.profile.preferences,
    });
  }, [props.myProfile]);

  const onProfilePictureDrop = (image) => {
    form.setFieldValue("image", image);
  };

  const onProfilePictureReject = (a) => {
    console.log("File rejected");
  };

  // When the edit profile form gets submitted
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      let profileData = new FormData();
      Object.keys(form.values).forEach((value) => {
        if (value === "image") {
          profileData.append("image", form.values.image[0]);
        } else if (value === "preferences") {
          profileData.append([value], JSON.stringify(form.values[value]));
        } else {
          profileData.append([value], form.values[value]);
        }
      });
      props.completeProfile(profileData, navigate, "/profile");
    }
  };

  return (
    <Modal
      centered
      opened={props.modalOpened}
      onClose={() => props.setModalOpened(false)}
      title="Edit your details"
      size="lg"
    >
      <form onSubmit={formSubmitHandler}>
        <Group direction="column" grow>
          <EditProfilePicture
            profilePicture={form.values.image}
            onProfilePictureDrop={onProfilePictureDrop}
            onProfilePictureReject={onProfilePictureReject}
            prevImageLink={props.myProfile.profile.photo}
          />
          <TextInput
            placeholder="New Name"
            label="Your Name"
            value={form.values.name}
            onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
            error={form.errors.name}
          />
          <TextInput
            placeholder="New Username"
            label="Username"
            value={form.values.username}
            onChange={(event) => form.setFieldValue("username", event.currentTarget.value)}
            error={form.errors.username}
          />
          <TextInput
            placeholder="New Email address"
            label="Email"
            value={form.values.email}
            onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
            error={form.errors.email}
          />
          {/* <DatePicker
            placeholder="New date of birth"
            label="Date of Birth"
            value={form.values.dateOfBirth}
            onChange={(dateValue) => form.setFieldValue("dateOfBirth", dateValue)}
            error={form.errors.dateOfBirth}
          /> */}
          <TextInput
            placeholder="Your phone number"
            label="Phone Number"
            value={form.values.phone}
            onChange={(event) => form.setFieldValue("phone", event.currentTarget.value)}
            error={form.errors.phone}
          />
          {/* <RadioGroup
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
          </RadioGroup> */}
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
          <MultiSelect
            label="Sports preferences"
            placeholder="Your sports preferences"
            data={sportsPreferences}
            searchable
            creatable
            value={form.values.preferences}
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => setSportsPreferences((current) => [...current, query])}
            onChange={(sportsValue) => form.setFieldValue("preferences", sportsValue)}
            transitionDuration={150}
            transition="pop-top-left"
            transitionTimingFunction="ease"
          />
          <Textarea
            placeholder="Your bio"
            label="Bio"
            value={form.values.bio}
            onChange={(event) => form.setFieldValue("bio", event.currentTarget.value)}
            autosize
            maxRows={3}
            minRows={2}
          />
        </Group>
        <Group mt={30} position="right">
          <Button type="submit" loading={props.completeMyProfileLoading}>
            Update Details
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default connect(null, { completeProfile })(OverviewTabModal);
