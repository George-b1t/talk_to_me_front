import { User } from "./interfaces";

function setLocalStorageUser(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
}

function getLocalStorageUser() {
  const stringUser = localStorage.getItem("user");

  return stringUser ? JSON.parse(stringUser) : null;
}

function setLocalStorageToken(token: string) {
  localStorage.setItem("token", token);
}

function getLocalStorageToken() {
  return localStorage.getItem("token") ?? "";
}

export {
  getLocalStorageUser,
  setLocalStorageUser,
  getLocalStorageToken,
  setLocalStorageToken,
};
