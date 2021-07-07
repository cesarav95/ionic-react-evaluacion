import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet,IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Home from './pages/Home/Home';
import Maps from './pages/Maps/Maps';
import Profile from './pages/Profile/Profile';
import Menu from './components/Menu/Menu';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Welcome from './pages/Welcome/Welcome';
import PrivateRouteHoc from './hoc/PrivateRouteHoc';
import PublicRouteHoc from './hoc/PublicRouteHoc';
import NotFound from './pages/NotFound/NotFound';
import { useContext } from 'react';
import ApplicationContext from './context/ApplicationContext';

const App: React.FC = () => {
  const applicationContext = useContext(ApplicationContext);
  return (
    <IonApp>
      <>
        {applicationContext.isAuthenticated === true ? (
          <IonReactRouter>
            <IonSplitPane contentId="main-app">
              <Menu />
              <IonRouterOutlet id="main-app">
                <Route exact path="/home" component={Home} />
                <Route exact path="/welcome" component={Welcome} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/maps" component={Maps} />
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
                <Route exact path="/login">
                  <Redirect to="/home" />
                </Route>
                <Route component={NotFound} />
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        ) : (
          <IonReactRouter>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/home">
              <Redirect to="/login" />
            </Route>
            <Route exact path="/profile">
              <Redirect to="/login" />
            </Route>
            <Route exact path="/maps">
              <Redirect to="/login" />
            </Route>

            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonReactRouter>
        )}
      </>
    </IonApp>
  );
};

export default App;
