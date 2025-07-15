import { Box, Typography, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const recommendations = [
  {
    title: "Hot Discount Days",
    subtitle: "Each Friday we deliver highest discounts",
    image: "/img/default-book.jpg",
    badge: "Hot",
    author: "Chef Deming",
    time: "30 min ago",
    location: "Turkey, Istanbul",
  },
  {
    title: "Join us on sns",
    subtitle: "We are offering healthy book topics on sns",
    image: "/img/default-book.jpg",
    badge: "New",
    author: "Belissimo Agent",
    time: "A week ago",
    location: "Europe, France",
  },
  {
    title: "New Project Launch",
    subtitle: "New books are arriving this month",
    image: "/img/default-book.jpg",
    badge: "Popular",
    author: "Morgan News",
    time: "5 days ago",
    location: "USA, Florida",
  },
];

export default function Recommendations() {
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
            {recommendations.map((value, index) => (
              <SwiperSlide key={index}>
                <div className="events-card">
                  <div className="events-img-wrapper">
                    <img
                      src={value.image}
                      alt={value.title}
                      className="events-img"
                    />
                    <span className="events-badge">{value.badge}</span>
                  </div>

                  <Box className="events-desc">
                    <Typography className="rec-title">{value.title}</Typography>
                    <Typography className="rec-subtitle">
                      {value.subtitle}
                    </Typography>

                    <Box className="event-organizator">
                      <PersonOutlineIcon fontSize="small" />
                      <span className="spec-text-author">{value.author}</span>
                    </Box>

                    <Box className="bott-info">
                      <Box className="bott-info-main">
                        <AccessTimeIcon fontSize="small" />
                        <span>{value.time}</span>
                      </Box>
                      <Box className="bott-info-main">
                        <LocationOnIcon fontSize="small" />
                        <span>{value.location}</span>
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
            alt="Previous"
          />
          <div className="dot-frame-pagination swiper-pagination"></div>
          <img
            src="/icons/arrow-right.svg"
            className="swiper-button-next"
            style={{ transform: "rotate(-180deg)" }}
            alt="Next"
          />
        </Box>
      </Stack>
    </div>
  );
}
