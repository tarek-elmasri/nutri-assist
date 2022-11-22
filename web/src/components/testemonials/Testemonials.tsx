import './testemonial.css';
import p1 from '../../assets/p1.png';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

const Testemony: React.FC<{
  title: string;
  img: string;
  text: string;
  subtitle: string;
}> = ({ title, img, text, subtitle }) => {
  return (
    <div className="main__testemonials_testemony">
      <div className="main__testemonials_testemony-container">
        <img src={img} alt={title} />
        <h4 style={{ color: '#FFF' }}>{title}</h4>
        <h6>{subtitle}</h6>
        <p>{text}</p>
      </div>
    </div>
  );
};

const Testemonials = () => {
  const testemonyList = [
    {
      title: 'Dr. Aya Salem',
      subtitle: 'Nutritionist',
      img: p1,
      text: "Since I started to use Nutri.Assist the time spent on meal planning and nutrition analysis has significantly decreased. The perfect link between me and my clients because we're connected, have access to all important data and track progress any time from anywhere in the world."
    },
    {
      title: 'Dr. Maged Kidwany',
      subtitle: 'Client',
      img: p1,
      text: "Since I started to use Nutri.Assist the time spent on meal planning and nutrition analysis has significantly decreased. The perfect link between me and my clients because we're connected, have access to all important data and track progress any time from anywhere in the world."
    }
  ];
  return (
    <div className="main__testemonials section__padding">
      <h1>What Our Customers Say</h1>
      <div className="main__testemonials-container">
        <Swiper
          modules={[Autoplay, Pagination, Scrollbar]}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          navigation
          pagination={{ clickable: true }}
          spaceBetween={15}
        >
          {testemonyList.map((testemony) => (
            <SwiperSlide key={testemony.title}>
              <Testemony
                title={testemony.title}
                subtitle={testemony.subtitle}
                text={testemony.text}
                img={testemony.img}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testemonials;
