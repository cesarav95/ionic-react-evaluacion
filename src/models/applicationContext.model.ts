import { ResultApi } from './resultApi';

export interface ApplicationContextModel {
  characters: ResultApi;
  refreshCharactersResult: (result: ResultApi) => void;
  isAuthenticated: boolean;
  refreshAuthenticated: () => void;
}
