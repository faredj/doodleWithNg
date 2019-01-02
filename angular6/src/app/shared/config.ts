const currentUserObj = JSON.parse(localStorage.getItem('user'));
export const config = {
  appName: `Doodle`,
  baseUrl: `http://localhost:3000/api/`,
  currentUser(): any {
    return JSON.parse(localStorage.getItem('user'));
  }
};
