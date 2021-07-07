import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { chevronBackSharp } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { User } from '../../models/user.model';
import { SignUp } from '../../services/AuthenticationService';
import { validateEmail, validateDataUser } from '../../services/ValidationService';

import './Register.css';
const Register: React.FC = () => {
  const history = useHistory();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [showToastValid, setShowToastValid] = useState({show:false, message:""});

  const refFirstName = useRef<HTMLIonInputElement>(null);
  const refLastName = useRef<HTMLIonInputElement>(null);
  const refEmail = useRef<HTMLIonInputElement>(null);
  const refPassword = useRef<HTMLIonInputElement>(null);

  const validateDataUserForm = async (e: any) =>{
    let val = e.target.value;
    let nombre = e.target.name;
    let isValid = nombre === 'email'? validateEmail(val): validateDataUser(val);
    let messageToast =  nombre === 'email'? 'Ingrese un email correcto.':`El campo ${nombre} debe tener minimo 6 caracteres.`
    if ( !isValid && val) { 
      setShowToastValid({show:true, message:messageToast})
    } else {
      setShowToastValid({show:false, message: messageToast})
    }    
  }

  const handleClickSignUp = async () => {
    const firstName = refFirstName.current?.value as string;
    const lastName = refLastName.current?.value as string;
    const email = refEmail.current?.value as string;
    const password = refPassword.current?.value as string;

    if (firstName && lastName && email && password) {
      const userToRegister: User = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };

      const resultSignUp = await SignUp(userToRegister);
      if (resultSignUp.userExists) {
        setMessage(resultSignUp.message);
      } else {
        if (resultSignUp.data) {
          setShowAlert(true);
        }
      }
    }
  };

  const handlerHideToastValid = () => {
    setShowToastValid({show: false, message:""});
  }

  const validateAllDataUserForm = () => {
    const firstName = refFirstName.current?.value as string;
    const lastName = refLastName.current?.value as string;
    const email = refEmail.current?.value as string;
    const password = refPassword.current?.value as string;
    if (validateEmail(email) && validateDataUser(firstName) &&
      validateDataUser(lastName) && validateDataUser(password)) {  
      //Si todo es correcto registrar
      console.log("todo correcto");
      handleClickSignUp()
    } else {
      setMessage("Complete todos los campos con el formato correcto.");
    }

  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonButton routerLink="/login" routerDirection="back">
              <IonIcon icon={chevronBackSharp} />
              Regresar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <br />
        <figure>
          <img
            src="https://ionicframework.com/blog/wp-content/uploads/2019/02/ionic-vs-react-native.png"
            alt="logo-app"
          />
        </figure>
        <IonItem lines="none" className="ion-item-register">
          <IonInput type="text" 
            placeholder="Nombres" 
            name="Nombres" ref={refFirstName} 
            onIonFocus={validateDataUserForm}
            onIonChange={validateDataUserForm}
            onBlur={handlerHideToastValid}
          />
        </IonItem>
        <IonItem lines="none" className="ion-item-register">
          <IonInput type="text" 
            placeholder="Apellidos" 
            name="Apellidos" 
            ref={refLastName} 
            onIonFocus={validateDataUserForm}
            onIonChange={validateDataUserForm}
            onBlur={handlerHideToastValid}
          />
        </IonItem>
        <IonItem lines="none" className="ion-item-register">
          <IonInput
            type="email"
            name="email"
            placeholder="Correo Electronico"
            ref={refEmail}
            onIonFocus={validateDataUserForm}
            onIonChange={validateDataUserForm}
            onBlur={handlerHideToastValid}
          />
        </IonItem>
        <IonItem lines="none" className="ion-item-register">
          <IonInput
            type="password"
            name="Contraseña"
            placeholder="Contraseña"
            ref={refPassword}
            onIonFocus={validateDataUserForm}
            onIonChange={validateDataUserForm}
            onBlur={handlerHideToastValid}
          />
        </IonItem>
        <IonAlert
          isOpen={showAlert}
          header="Felicidades"
          message="La cuenta se registro correctamente."
          buttons={[
            {
              text: 'OK',
              handler: () => {
                history.push('/login');
              },
            },
          ]}
        />
        <IonToast
          isOpen={message !== undefined}
          onDidDismiss={() => setMessage(undefined)}
          message={message}
          duration={3000}
        />
        <IonToast
          isOpen={showToastValid.show}
          onDidDismiss={() => setShowToastValid({show: false, message: ""})}
          message={showToastValid.message}
          position="top"
          color="warning"
        />
      </IonContent>
      <IonFooter className="ion-padding">
        <IonButton
          size="large"
          expand="block"
          fill="solid"
          onClick={validateAllDataUserForm}
        >
          Registrar
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Register;
