import { json, redirect } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import { getToken } from "../src/utils/auth";

const Auth = () => {
  return (
    <div>
      <AuthForm />
    </div>
  );
};

export default Auth;

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode");

  if (mode != "login" && mode != "signup") {
    throw json({ message: "Mode doesn't not exist" }, { status: 401 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Can't make the request" }, { status: 402 });
  }

  const resData = await response.json();
  const authToken = resData.token;

  localStorage.setItem("token", authToken);
  let expTime = new Date();
  expTime.setHours(expTime.getHours() + 1);
  localStorage.setItem("exp", expTime.toISOString());

  return redirect("/");
};
