export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export const getUserFromLocalStorage = () => {
  const resultUser = localStorage.getItem('user');
  const user = resultUser ? JSON.parse(resultUser) : null;
  return user;
};

export const addTokenToLocalStorage = (token) => {
  localStorage.setItem('token', JSON.stringify(token));
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('token');
};

export const getTokenFromLocalStorage = () => {
  const resultToken = localStorage.getItem('token');
  const token = resultToken ? JSON.parse(resultToken) : null;
  return token;
};

// export const getRoleFromLocalStorage = () => {
//   const result = localStorage.getItem('user');
//   const user = result ? JSON.parse(result) : null;
//   const role = user.role;
//   return role;
// };
