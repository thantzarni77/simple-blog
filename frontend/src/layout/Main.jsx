import {
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getDuration } from "../utils/auth";

const Main = () => {
  const submit = useSubmit();
  const { state } = useNavigation();
  const token = useLoaderData();

  const [loading, setLoading] = useState(true);

  {
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  }

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
      {loading ? (
        <div className="loaderContainer mainLoader">
          <span className="loader"></span>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Main;
