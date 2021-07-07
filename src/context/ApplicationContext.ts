import React from 'react';
import { ApplicationContextModel } from '../models/applicationContext.model';

const ApplicationContext = React.createContext<ApplicationContextModel>({
  characters: {prev:'', next:'', current:1, results: []},
  refreshCharactersResult: () => {},
  isAuthenticated: false,
  refreshAuthenticated: () => {},
});

export default ApplicationContext;
