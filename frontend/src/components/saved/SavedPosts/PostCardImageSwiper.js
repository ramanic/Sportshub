import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Lazy } from "swiper";
import { Image, createStyles, Box } from "@mantine/core";
import { IoCaretForwardOutline, IoCaretBackOutline } from "react-icons/io5";
import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/navigation";

const useStyles = createStyles((theme, _params, getRef) => ({
  swiperButton: {
    color: theme.colors.primary[6],
    zIndex: 10,
    fontSize: 25,
    position: "absolute",
    top: 0,
    opacity: "0.5",
    transition: "all .2s",
    cursor: "pointer",
    transform: "translateY(-50%)",
    top: "50%",
    "&:hover": {
      color: theme.colors.primary[7],
      opacity: "1",
    },
  },
  swiperPrev: {
    left: 0,
  },
  swiperNext: {
    right: 0,
  },
}));

const PostCardImageSwiper = (props) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { classes } = useStyles();

  return (
    <Swiper
      // spaceBetween={20}
      lazy={true}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      loop={false}
      modules={[Navigation, Lazy]}
      onBeforeInit={(swiper) => {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
      }}
      style={{ position: "relative", width: "100%" }}
    >
      {props.images.map((image) => (
        <SwiperSlide key={image}>
          <Image
            src={image}
            className="swiper-lazy"
            height={props.height}
            radius="sm"
            mt={6}
            width="100%"
          />
        </SwiperSlide>
      ))}

      <div ref={prevRef} className={`${classes.swiperButton} ${classes.swiperPrev}`}>
        <IoCaretBackOutline />
      </div>
      <div ref={nextRef} className={`${classes.swiperButton} ${classes.swiperNext}`}>
        <IoCaretForwardOutline />
      </div>
    </Swiper>
  );
};

export default PostCardImageSwiper;
