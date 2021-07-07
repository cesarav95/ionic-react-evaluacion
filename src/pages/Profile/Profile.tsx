import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonFabButton,
  IonIcon,
  IonFab,
  useIonViewWillEnter,
} from '@ionic/react';
import { camera } from 'ionicons/icons';
import React, { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import './Profile.css';
import { Storage } from '@capacitor/storage';

const Profile: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();
  const [userData, setUserData] = useState<any>({});

  useIonViewWillEnter(async () => {
    const { value: name } = await Storage.get({ key: 'USER_NAME' });
    const { value: lastName } = await Storage.get({ key: 'USER_LAST_NAME'});
    const { value: email } = await Storage.get({ key: 'USER_EMAIL'});
    setUserData({name, lastName, email});
  });

  const takePhoto = async () => {
    const cameraPhoto = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    if (cameraPhoto) {
      setPhotoUrl(cameraPhoto.dataUrl);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Ionic App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonAvatar>
                <img
                  alt="avatar"
                  src={
                    !photoUrl
                      ? 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
                      : photoUrl
                  }
                />
              </IonAvatar>
              <h1>{userData.name} {userData.lastName}</h1>
              <h2>{userData.email}</h2>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
