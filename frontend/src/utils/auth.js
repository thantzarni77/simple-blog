import { redirect } from "react-router-dom";

export const getDuration = () => {
  const expTime = localStorage.getItem("exp");
  const currentTimeinMili = new Date();
  const expTimeinMili = new Date(expTime);
  const duration = expTimeinMili - currentTimeinMili;

  return duration;
};

export const getToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const duration = getDuration();

  if (duration < 0) {
    return "TOKEN_EXP";
  }
  return token;
};

export const TokenLoader = () => {
  return getToken();
};

export const checkTokenLoader = () => {
  const token = getToken();

  if (!token) {
    return redirect("/restricted");
  }
  return token;
};
