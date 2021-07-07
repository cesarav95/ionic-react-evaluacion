import { User } from './user.model';

export interface Result {
  error?: boolean;
  isAuthenticated?: boolean;
  userExists?: boolean;
  message?: string;
  data?: User;
}
