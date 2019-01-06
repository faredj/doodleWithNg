import {User} from "../models/User";

export const config = {
  appName: `Doodle`,
  baseUrl: `http://localhost:3000/api/`,
  connectedUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  },
};
