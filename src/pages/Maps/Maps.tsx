import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  useIonViewWillEnter,
  IonLoading,
} from '@ionic/react';
import React, { useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const Maps: React.FC = () => {
  const [location, setLocation] = useState({
    lat: 28.4743207,
    lng: -81.4678193,
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCy0Wdha6agFeovPQhW0VF7vEBZqAljDXo',
  });

  const getCoordinates = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    const lat = coordinates.coords.latitude;
    const lng = coordinates.coords.longitude;
    setLocation({ lat: lat, lng: lng });
  };

  useIonViewWillEnter(() => {
    getCoordinates();
  });

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
      <IonContent>
        {isLoaded ? (
          <GoogleMap
            center={location}
            zoom={13}
            mapContainerStyle={containerStyle}
          >
            <Marker position={{ lat: location.lat, lng: location.lng }} />
          </GoogleMap>
        ) : (
          <IonLoading isOpen={true} message={'Cargando...'} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Maps;
