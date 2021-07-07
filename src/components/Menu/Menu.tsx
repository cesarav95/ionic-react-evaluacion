import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonList,
  IonMenuToggle,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { close, home, logOut, map, person } from 'ionicons/icons';
import { menuController } from '@ionic/core';
import React, { useContext } from 'react';
import { Storage } from '@capacitor/storage';
import ApplicationContext from '../../context/ApplicationContext';

const Menu: React.FC = () => {
  const applicationContext = useContext(ApplicationContext);

  const handleClickSignOut = async() => {
    await Storage.remove({ key: 'IS_AUTHENTICATED' });
    applicationContext.refreshAuthenticated();
  };

  return (
    <IonMenu contentId="main-app" side="end" type="overlay">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
          <IonButtons
            slot="end"
            onClick={async () => await menuController.toggle()}
          >
            <IonButton>
              <IonIcon icon={close} size="large"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle>
            <IonItem lines="none" routerLink="/home" routerDirection="none">
              <IonIcon icon={home} slot="start"></IonIcon>
              <IonLabel>Principal</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem lines="none" routerLink="/maps" routerDirection="none">
              <IonIcon icon={map} slot="start"></IonIcon>
              <IonLabel>Mapas</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem lines="none" routerLink="/profile" routerDirection="none">
              <IonIcon icon={person} slot="start"></IonIcon>
              <IonLabel>Mi Perfil</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem lines="none" onClick={handleClickSignOut}>
              <IonIcon icon={logOut} slot="start"></IonIcon>
              <IonLabel>Cerrar Sesión</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
