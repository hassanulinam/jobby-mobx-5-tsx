import { getAccessToken } from "./accessToken";

export const getFetchOptions = () => {
  const accessToken = getAccessToken();
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
};
