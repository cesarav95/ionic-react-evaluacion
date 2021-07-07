import { IonSlide, IonSlides } from '@ionic/react';
import React from 'react';
import { Slide } from '../../models/slide.model';
import IonIcon from '@reacticons/ionicons';

interface SlidesProps {
  slides: Slide[];
  onClickGoHome: () => void;
}

const slideOptions = {
  autoplay: true,
  initialSlide: 0,
  slidesPerView: 1,
  centeredSlides: true,
  speed: 400,
};

const Slides: React.FC<SlidesProps> = ({ slides, onClickGoHome }) => {
  return (
    <IonSlides pager={true} options={slideOptions}>
      {slides.map((slide) => (
        <IonSlide key={slide.id}>
          <IonIcon
            name="close"
            className="ion-icon"
            onClick={onClickGoHome}
          ></IonIcon>
          <br />
          <br />
          <img src={slide.pathImage} alt="" />
          <br />
          <br />
          <h3>{slide.title}</h3>
          <p>{slide.description}</p>
        </IonSlide>
      ))}
    </IonSlides>
  );
};

export default Slides;
