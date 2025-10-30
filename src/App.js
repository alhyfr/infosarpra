import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Team from "./pages/slidepage/Team";
import Coe from "./pages/slidepage/Coe";
import Keluhan from "./pages/slidepage/Keluhan";
import Peminjaman from "./pages/slidepage/Peminjaman";


function App() {
  return (
    <>

      <Swiper
        modules={[Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        autoplay={{
          delay: 60000, // 1 menit = 60,000ms
          disableOnInteraction: false, // Tetap autoplay meskipun user berinteraksi
          pauseOnMouseEnter: false, // Tidak pause saat mouse hover
        }}
        loop={true} // Loop terus menerus
        speed={1000} // Durasi transisi 1 detik
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <Team />
        </SwiperSlide>
        <SwiperSlide>
          <Coe />
        </SwiperSlide>
        <SwiperSlide>
          <Keluhan />
        </SwiperSlide>
        <SwiperSlide>
          <Peminjaman />
        </SwiperSlide>
      </Swiper>

    </>
  );
}

export default App;
