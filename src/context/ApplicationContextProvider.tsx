import { Storage } from '@capacitor/storage';
import React, { useState } from 'react';
import { ApplicationContextModel } from '../models/applicationContext.model';
import { Character } from '../models/character.model';
import { ResultApi } from '../models/resultApi';
import ApplicationContext from './ApplicationContext';

const ApplicationContextProvider: React.FC = (props) => {

  //const [characters, setCharacters] = useState<Character[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [characters, setCharacters] = useState<ResultApi>({prev:'',next:'', current:1, results:[]});
  /*const refreshCharacters = (characters: Character[]) => {
    setCharacters(characters);
  };*/

  const refreshCharactersResult = (charactersResult: ResultApi) => {
    console.log("refrescando ..");
    setCharacters(charactersResult);
  };

  const refreshAuthenticated = async () => {
    const { value } = await Storage.get({ key: 'IS_AUTHENTICATED' });
    setIsAuthenticated(value !== null ? true : false);
  };

  refreshAuthenticated();

  const applicationContext: ApplicationContextModel = {
    characters,
    refreshCharactersResult,
    isAuthenticated,
    refreshAuthenticated,
  };

  return (
    <ApplicationContext.Provider value={applicationContext}>
      {props.children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
