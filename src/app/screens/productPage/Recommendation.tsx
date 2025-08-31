import { Box, Typography, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { createSelector } from "reselect";
import { retrieveAlsoLike } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";

import { Book } from "../../../lib/types/product";

import { useNavigate } from "react-router-dom";

/*********** REDUX SLICE AND SELECTOR ***********/

const recommendationRetriever = createSelector(
  retrieveAlsoLike,
  (alsoLike) => ({ alsoLike })
);

export default function Recommendations() {
  const { alsoLike } = useSelector(recommendationRetriever);

  const navigate = useNavigate();
  return (
    <div className="events-frame">
      <Stack className="events-main">
        <Box className="events-text">
          <span className="category-title">You may also Like</span>
        </Box>

        <div className="events-swiper-wrapper">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            className="events-info"
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={30}
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={800}
          >
            {alsoLike.map((value: Book, index) => (
              <SwiperSlide
                key={index}
                onClick={() => navigate(`/product/${value._id}`)}
              >
                <div className="events-card">
                  <div className="events-img-wrapper">
                    <img
                      src={
                        value?.coverImages?.[0]
                          ? `${serverApi}/${value.coverImages[0]}`
                          : "/img/default-book.jpg"
                      }
                      alt={value.title}
                      className="events-img"
                    />
                    <span className="events-badge">{value.badge}</span>
                  </div>

                  <Box className="events-desc">
                    <Typography className="rec-title">{value.title}</Typography>
                    <Typography className="rec-subtitle">
                      {value.description?.slice(0, 130)} ... Read more
                    </Typography>

                    <Box className="event-organizator">
                      <PersonOutlineIcon fontSize="small" />
                      <span className="spec-text-author">{value.author}</span>
                    </Box>

                    <Box className="bott-info">
                      <Box className="bott-info-main">
                        <ScheduleIcon fontSize="small" />

                        <span>
                          {/* {new Date(value.createdAt).toLocaleDateString(
                            "en-CA",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          )} */}
                        </span>
                      </Box>
                      <Box className="bott-info-main">
                        <LocationOnIcon fontSize="small" />
                        <span>Seoul</span>
                      </Box>
                    </Box>
                  </Box>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Box className="prev-next-frame">
          <img
            src="/icons/arrow-right.svg"
            className="swiper-button-prev"
            style={{ transform: "rotate(-180deg)" }}
            alt="Previous"
          />
          <div className="dot-frame-pagination swiper-pagination"></div>
          <img
            src="/icons/arrow-right.svg"
            className="swiper-button-next"
            alt="Next"
          />
        </Box>
      </Stack>
    </div>
  );
}
