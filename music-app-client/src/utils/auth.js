const tokenName = "music-player-token";

export const setToken = (token) => {
  localStorage.setItem(tokenName, token);
};

export const getToken = () => {
  return localStorage.getItem(tokenName);
};

export const removeToken = () => {
  localStorage.removeItem(tokenName);
};

export const getUser = () => {
  const token = getToken();

  if (!token) return null;

  const payloadString = token.split(".")[1];

  const { user, exp } = JSON.parse(atob(payloadString));

  const today = Date.now() / 1000;
  if (today > exp) {
    removeToken();
    return null;
  }

  return user;
};
