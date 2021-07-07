import { IonPage, IonContent, IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <br />
        <br />
        <figure>
          <img
            src="https://ionicframework.com/blog/wp-content/uploads/2019/02/ionic-vs-react-native.png"
            alt="logo-app"
          />
        </figure>
        <br />
        <IonGrid>
          <IonRow>
            <IonCol>
              <h1>💀NOT FOUND</h1>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
