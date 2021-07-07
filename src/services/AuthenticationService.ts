import { Result } from '../models/resultAuthenticated.model';
import { User } from '../models/user.model';

const API_URL = 'http://192.168.0.108:3027/users';
let options: any = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const SignIn = async (userToLogin: User): Promise<Result> => {
  const response = await fetch(API_URL, options);
  let users: User[] = await response.json();
  let result: Result = {};

  let usersFilters: User[] = users.filter(
    (user: User) =>
      user.email === userToLogin.email &&
      user.password === btoa(userToLogin.password)
  );

  if (usersFilters.length > 0) {
    result = {
      error: false,
      isAuthenticated: true,
      message: '',
      data: usersFilters[0],
    };
  } else {
    result = {
      error: false,
      isAuthenticated: false,
      message: 'Usuario y/o contraseña incorrecta.',
    };
  }

  return result;
};

const SignUp = async (userToRegister: User): Promise<Result> => {
  let result: Result = {};
  const response = await fetch(API_URL, options);
  let users: User[] = await response.json();
  let usersFilter = users.filter((user) => user.email === userToRegister.email);
  if (usersFilter.length > 0) {
    result = {
      error: false,
      userExists: true,
      message: 'El correo ingresado ya se encuentra registrado.',
    };
  } else {
    let optionsCreateUser = options;
    optionsCreateUser = {
      ...optionsCreateUser,
      method: 'POST',
      body: JSON.stringify({
        ...userToRegister,
        password: btoa(userToRegister.password),
      }),
    };

    const resultFetch = await fetch(API_URL, optionsCreateUser);
    const data: User = await resultFetch.json();

    result = {
      error: false,
      userExists: false,
      message: '',
      data: data,
    };
  }

  return result;
};
export { SignIn, SignUp };
