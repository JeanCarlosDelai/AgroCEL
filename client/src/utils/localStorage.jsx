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

export const addPropertyToLocalStorage = (id, name) => {
  localStorage.setItem('propertyName', JSON.stringify(name));
  localStorage.setItem('propertyId', JSON.stringify(id));
};

export const getPropertyIdFromLocalStorage = () => {
  const propertyId = localStorage.getItem('propertyId');
  const propertyId2 = propertyId ? JSON.parse(propertyId) : null;
  return propertyId2;
};

export const getPropertyNameFromLocalStorage = () => {
  const propertyName = localStorage.getItem('propertyName');
  const propertyName2 = propertyName ? JSON.parse(propertyName) : null;
  return propertyName2;
};

export const removePropertyFromLocalStorage = () => {
  localStorage.removeItem('propertyName');
  localStorage.removeItem('propertyId');
};
