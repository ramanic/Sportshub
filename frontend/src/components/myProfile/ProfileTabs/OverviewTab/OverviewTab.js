import React, { useState } from "react";
import { Box, Group, Alert, Button, Badge, Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import OverviewTabModal from "./OverviewTabModal";
import ChangePasswordModal from "./ChangePasswordModal";

const OverviewTab = (props) => {
  const xsScreen = useMediaQuery("(min-width: 600px)");
  const mediumScreen = useMediaQuery("(min-width: 992px)");
  const largeScreen = useMediaQuery("(min-width: 1200px)");

  const [modalOpened, setModalOpened] = useState(false);
  const [passModalOpened, setPassModalOpened] = useState(false);

  return (
    <Box mt={16}>
      <Grid columns={12}>
        <Grid.Col xs={6}>
          <Alert title="Full Name" variant="outline" sx={{ height: 76 }}>
            {props.myProfile.name}
          </Alert>
        </Grid.Col>
        <Grid.Col xs={6}>
          <Alert title="Username" variant="outline" sx={{ height: 76 }}>
            {props.myProfile.username}
          </Alert>
        </Grid.Col>
        <Grid.Col xs={6}>
          <Alert title="Email" variant="outline" sx={{ height: 76 }}>
            {props.myProfile.email}
          </Alert>
        </Grid.Col>
        <Grid.Col xs={6}>
          <Alert title="Phone Number" variant="outline" sx={{ height: 76 }}>
            {props.myProfile.profile.phone ? props.myProfile.profile.phone : null}
          </Alert>
        </Grid.Col>
        <Grid.Col xs={6}>
          <Alert title="Location" variant="outline" sx={{ height: 76 }}>
            {props.myProfile.profile.address?.city
              ? props.myProfile.profile.address.city +
                ", " +
                props.myProfile.profile.address.district
              : null}
          </Alert>
        </Grid.Col>
        <Grid.Col xs={6}>
          <Alert title="Role" variant="outline" sx={{ height: 76 }}>
            <Badge radius="sm" color="dark">
              {props.myProfile.role}
            </Badge>
          </Alert>
        </Grid.Col>
        <Grid.Col xs={12}>
          <Alert title="Bio" variant="outline" sx={{ height: 76 }}>
            {props.myProfile.profile.bio ? props.myProfile.profile.bio : null}
          </Alert>
        </Grid.Col>
        <Grid.Col span={12}>
          <Button onClick={() => setModalOpened(true)}>Edit</Button>
          <Button ml={26} onClick={() => setPassModalOpened(true)}>
            Change Password
          </Button>
        </Grid.Col>
      </Grid>

      <OverviewTabModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        myProfile={props.myProfile}
        completeMyProfileLoading={props.completeMyProfileLoading}
      />
      <ChangePasswordModal
        passModalOpened={passModalOpened}
        setPassModalOpened={setPassModalOpened}
      />
    </Box>
  );
};

export default OverviewTab;
