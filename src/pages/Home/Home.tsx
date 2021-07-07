import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  IonFooter,
  IonButton,
  IonIcon,
  IonText,
} from '@ionic/react';
import { useContext } from 'react';
import ApplicationContext from '../../context/ApplicationContext';
import './Home.css';
import { arrowForward, arrowBack} from 'ionicons/icons';
import { ResultApi } from '../../models/resultApi';

const URL_API = 'https://rickandmortyapi.com/api/character';
const Home: React.FC = () => {

  const applicationContext = useContext(ApplicationContext);

  const requestApi = async(url: string, pageNumber:  number)=> {
    const result = await fetch(url);
    const data = await result.json();
    const resultCharacters: ResultApi = {
      current: pageNumber,
      prev:data.info.prev,
      next: data.info.next,
      pages: data.info.pages,
      results: data.results
    }
    return resultCharacters;
  }

  const updateListCharacters = (url: string, page: number)=> {
    setTimeout(async () => {
      const resultCharacters: ResultApi = await requestApi(url,page);
      /**ACTUALIZANDO EL ESTADO */
      applicationContext.refreshCharactersResult(resultCharacters);
    }, 1000);
  }

  useIonViewDidEnter(() => {
    updateListCharacters(URL_API, 1);
  });

  const handlerPrevPage = () => {
    console.log("refrescando anterior");
    // Limpiar lista de personajes
    applicationContext.refreshCharactersResult({ ...applicationContext.characters, results:[]});
    //Actualizar lista de personajes de la pagina anterior
    const nroPage = applicationContext.characters.current;
    updateListCharacters(applicationContext.characters.prev, nroPage - 1);
  }

  const handlerNextPage = () => {
    console.log("refrescando siguiente");
    //Limpiar list de personajes
    applicationContext.refreshCharactersResult({ ...applicationContext.characters, results:[]});
    //Actualizar siguiente pagina de personajes
    const nroPage = applicationContext.characters.current;
    updateListCharacters(applicationContext.characters.next, nroPage + 1);
  }

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
        {applicationContext.characters.results.length === 0 ? (
          <IonGrid>
            <IonRow>
              <IonCol className="ion-text-center">
                <IonCard>
                  <IonSkeletonText
                    animated
                    style={{ width: '100%', height: '300px' }}
                  />
                  <IonCardHeader>
                    <IonCardSubtitle>
                      <IonSkeletonText animated style={{ width: '100%' }} />
                    </IonCardSubtitle>
                    <IonCardTitle>
                      <IonSkeletonText animated style={{ width: '100%' }} />
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonSkeletonText animated style={{ width: '100%' }} />
                  </IonCardContent>
                </IonCard>
                <IonCard>
                  <IonSkeletonText
                    animated
                    style={{ width: '100%', height: '300px' }}
                  />
                  <IonCardHeader>
                    <IonCardSubtitle>
                      <IonSkeletonText animated style={{ width: '100%' }} />
                    </IonCardSubtitle>
                    <IonCardTitle>
                      <IonSkeletonText animated style={{ width: '100%' }} />
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonSkeletonText animated style={{ width: '100%' }} />
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        ) : (
          <IonGrid>
            {applicationContext.characters.results.map((item) => (
              <IonRow key={item.id}>
                <IonCol className="ion-text-center">
                  <IonCard>
                    <img src={item.image} alt="content-rym" />
                    <IonCardHeader>
                      <IonCardSubtitle>{item.species}</IonCardSubtitle>
                      <IonCardTitle>{item.name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <p>{item.status}</p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        )}
      </IonContent>
      <IonFooter className="cont-navigate">
          <IonButton fill="clear" color="primary"  
          disabled={applicationContext.characters.current === 1}
          onClick={handlerPrevPage}
        > 
            <IonIcon icon={arrowBack} ></IonIcon>
            Ant.
          </IonButton>
          <IonText>
            {applicationContext.characters.current} de {applicationContext.characters.pages}
          </IonText>

          <IonButton fill="clear" color="primary" 
            disabled={applicationContext.characters.current === applicationContext.characters.pages}
            onClick={handlerNextPage}
          > 
          Sig.
            <IonIcon icon={arrowForward} ></IonIcon>
          </IonButton>
          
      </IonFooter>
    </IonPage>
  );
};

export default Home;
