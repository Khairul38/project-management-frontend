export const setToLocalStorage = (key, data) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return JSON.parse(localStorage.getItem(key));
};
