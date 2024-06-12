import {
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { getDuration } from "../utils/auth";

const Main = () => {
  const submit = useSubmit();
  const { state } = useNavigation();
  const token = useLoaderData();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "TOKEN_EXP") {
      submit(null, { action: "/logout", method: "POST" });
    }

    const duration = getDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, [duration]);
  }, [token, submit]);
  return (
    <div>
      <Navbar />
      {state === "loading" ? (
        <div className="loaderContainer">
          <span className="loader"></span>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Main;
