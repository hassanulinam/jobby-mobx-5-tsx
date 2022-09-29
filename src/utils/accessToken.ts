import Cookies from "js-cookie";

export const getAccessToken = () => Cookies.get("jwt_token");

export const setAccessToken = (token: string) =>
  Cookies.set("jwt_token", token, { expires: 3 });

export const deleteAccessToken = () => Cookies.remove("jwt_token");
