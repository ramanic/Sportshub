import React from "react";
import { Box, Group, Alert, Badge, Grid } from "@mantine/core";

const OverviewTab = (props) => {
  return (
    <Box mt={16}>
      <Grid columns={12}>
        <Grid.Col xs={6}>
          <Alert title="Full Name" variant="outline" sx={{ height: 76 }}>
            {props.userProfile.name}
          </Alert>
        </Grid.Col>
        <Grid.Col xs={6}>
          <Alert title="Username" variant="outline" sx={{ height: 76 }}>
            {props.userProfile.username}
          </Alert>
        </Grid.Col>
        <Grid.Col xs={6}>
          <Alert title="Email" variant="outline" sx={{ height: 76 }}>
            {props.userProfile.email}
          </Alert>
        </Grid.Col>
        <Grid.Col xs={6}>
          <Alert title="Phone Number" variant="outline" sx={{ height: 76 }}>
            {props.userProfile.profile.phone ? props.userProfile.profile.phone : null}
          </Alert>
        </Grid.Col>
        <Grid.Col xs={6}>
          <Alert title="Location" variant="outline" sx={{ height: 76 }}>
            {props.userProfile.profile.address?.city
              ? props.userProfile.profile.address.city +
                ", " +
                props.userProfile.profile.address.district
              : null}
          </Alert>
        </Grid.Col>
        <Grid.Col xs={6}>
          <Alert title="Role" variant="outline" sx={{ height: 76 }}>
            <Badge radius="sm" color="dark">
              {props.userProfile.role}
            </Badge>
          </Alert>
        </Grid.Col>
        <Grid.Col xs={12}>
          <Alert title="Bio" variant="outline" sx={{ height: 76 }}>
            {props.userProfile.profile.bio ? props.userProfile.profile.bio : null}
          </Alert>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default OverviewTab;
