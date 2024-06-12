import { useRouteError, Link } from "react-router-dom";
import { IoMdWarning } from "react-icons/io";

const Error = () => {
  const error = useRouteError();
  let errorMessage = "Something went wrong !!";

  if (error.status === 400) {
    errorMessage = error.data.message;
  }

  if (error.status === 402) {
    errorMessage = error.data.message;
  }

  if (error.status === 408) {
    errorMessage = error.data.message;
  }

  if (error.status === 500) {
    errorMessage = error.data.message;
  }
  return (
    <div className="errorContainer">
      <IoMdWarning color="#ffffff" size={250} />
      <div>{errorMessage}</div>
      <Link to="/">
        <p>Go Back Home</p>
      </Link>
    </div>
  );
};

export default Error;
