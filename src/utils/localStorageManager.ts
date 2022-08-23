import { User } from "./interfaces";

function setLocalStorateUser(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
}

function getLocalStorateUser() {
  return JSON.parse(localStorage.getItem("user") ?? "");
}

export { getLocalStorateUser, setLocalStorateUser };
