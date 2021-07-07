import {
  IonButton,
  IonContent,
  IonFooter,
  IonInput,
  IonItem,
  IonPage,
  IonToast
} from '@ionic/react';
import React, { useContext, useRef, useState } from 'react';
import { SignIn } from '../../services/AuthenticationService';
import { User } from '../../models/user.model';

import './Login.css';
import { Result } from '../../models/resultAuthenticated.model';
import { Storage } from '@capacitor/storage';
import ApplicationContext from '../../context/ApplicationContext';

import { validateEmail, validateDataUser } from '../../services/ValidationService';

const Login: React.FC = () => {

  const applicationContext = useContext(ApplicationContext);
  const refEmail = useRef<HTMLIonInputElement>(null);
  const refPassword = useRef<HTMLIonInputElement>(null);

  const [showToastMessage, setShowToastMessage] = useState({show:false, message:""});
  const [showToastValid, setShowToastValid] = useState({show:false, message:""});

  const handleClickSignIn = async () => {
    const email = refEmail.current?.value as string;
    const password = refPassword.current?.value as string;

    const userSignIn: User = {
      email: email,
      password: password,
    };

    const resultSignIn: Result = await SignIn(userSignIn);
    if (resultSignIn.isAuthenticated) {
      let userData = resultSignIn.data as any;
      Storage.set({ key: 'IS_AUTHENTICATED', value: 'true' });
      Storage.set({ key: 'USER_NAME', value: userData.firstName});
      Storage.set({ key: 'USER_LAST_NAME', value: userData.lastName});
      Storage.set({ key: 'USER_EMAIL', value: userData.email});
      applicationContext.refreshAuthenticated();
    } else {
      let messageToast = resultSignIn.message as string;
      setShowToastMessage({show: true, message: messageToast});
    }
  };

  const handlerChangeInput=(e: any)=> {
    let val = e.target.value;
    let nombre = e.target.name;
    let isValid = nombre === 'email'? validateEmail(val): validateDataUser(val);
    let messageToast =  nombre === 'email'? 'Ingrese un email correcto.':'La contraseña debe tener minimo 6 caracteres.'
    if ( !isValid && val) { 
      setShowToastValid({show:true, message:messageToast})
    } else {
      setShowToastValid({show:false, message: messageToast})
    }    
  }
  const handlerHideToastValid = () => {
    setShowToastValid({show: false, message:""});
  }


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
        <IonItem lines="none" className="ion-item-login">
          <IonInput
            name="email"
            type="email"
            placeholder="Correo Electronico"
            ref={refEmail}
            onIonFocus={handlerChangeInput}
            onIonChange={handlerChangeInput}
          />
        </IonItem>
        <IonItem lines="none" className="ion-item-login">
          <IonInput
            name="password"
            type="password"
            placeholder="Contraseña"
            ref={refPassword}
            onIonFocus={handlerChangeInput}
            onIonChange={handlerChangeInput}
            onBlur={handlerHideToastValid}
          />
        </IonItem>

        <IonToast
          isOpen={showToastValid.show}
          onDidDismiss={() => setShowToastMessage({show: false, message: ""})}
          message={showToastValid.message}
          position="top"
          color="warning"
        />

        <IonToast
          isOpen={showToastMessage.show}
          onDidDismiss={() => setShowToastMessage({show: false, message: ""})}
          message={showToastMessage.message}
          position="top"
          duration={1000}
          color="danger"
          buttons={[
            {
              text: 'Ok',
              role: 'cancel'
            }
          ]}
        />

      </IonContent>
      <IonFooter className="ion-padding">
        <IonButton
          size="large"
          expand="block"
          type="button"
          fill="solid"
          onClick={handleClickSignIn}
        >
          Ingresar
        </IonButton>
        <IonButton
          size="large"
          expand="block"
          fill="outline"
          routerLink="/register"
          routerDirection="forward"
        >
          Registrar
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Login;
