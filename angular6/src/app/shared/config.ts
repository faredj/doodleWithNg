const currentUserObj = JSON.parse(localStorage.getItem('user'));
export const config = {
  appName: `Meeting Orga`,
  baseUrl: `http://localhost:3000/api/`,
  currentUser: currentUserObj
};
