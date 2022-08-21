import React from "react";
import { Box, Group, Image, Grid, Button } from "@mantine/core";
import { IoImageOutline } from "react-icons/io5";
import { useMediaQuery } from "@mantine/hooks";

const VenueGallery = (props) => {
  const xsScreen = useMediaQuery("(min-width: 500px)");
  const mediumScreen = useMediaQuery("(min-width: 992px)");
  const largeScreen = useMediaQuery("(min-width: 1200px)");
  const xlScreen = useMediaQuery("(min-width: 1400px)");

  let newImages = [];
  if (props.venueImages.length > 3 && mediumScreen) {
    newImages = [props.venueImages[0], props.venueImages[1], props.venueImages[2]];
  } else if (props.venueImages.length > 2 && !mediumScreen && xsScreen) {
    newImages = [props.venueImages[0], props.venueImages[1]];
  } else if (props.venueImages.length > 1 && !xsScreen) {
    newImages = [props.venueImages[0]];
  } else {
    newImages = props.venueImages;
  }

  return (
    <>
      <Grid columns={12}>
        {newImages.map((image) => (
          <Grid.Col span={12} xs={6} md={4} key={image}>
            <Image radius="xs" src={image} height={xlScreen ? 350 : largeScreen ? 280 : 210} />
          </Grid.Col>
        ))}
      </Grid>
      <Button
        variant="filled"
        color="primary"
        size="xs"
        leftIcon={<IoImageOutline size={18} />}
        style={{ transform: "translateY(-35px)", right: 22, position: "absolute" }}
      >
        Gallery
      </Button>
    </>
  );
};

export default VenueGallery;
