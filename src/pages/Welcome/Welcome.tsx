import {
  IonPage,
  IonContent,
  useIonViewWillEnter,
  IonLoading,
} from '@ionic/react';
import React, { useState } from 'react';
import Slides from '../../components/Slides/Slides';
import { getSlides } from '../../data/slides';
import { Slide } from '../../models/slide.model';
import { RouteComponentProps } from 'react-router';
import { setStorage } from '../../storage/ManageStorage';
import '../Welcome/Welcome.css';

const Welcome: React.FC<RouteComponentProps> = ({ history }) => {
  const [slides, setSlides] = useState<Slide[]>([]);

  const handleGoHome = () => {
    setStorage('LOOK_SLIDES', 'true');
    history.push('/home');
  };

  useIonViewWillEnter(() => {
    setTimeout(() => {
      const arraySlides = getSlides();
      setSlides(arraySlides);
    }, 5000);
  });

  return (
    <IonPage>
      <IonContent className="ion-content-welcome">
        {slides.length === 0 ? (
          <IonLoading isOpen={true} message={'Cargando...'} />
        ) : (
          <Slides slides={slides} onClickGoHome={handleGoHome} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
