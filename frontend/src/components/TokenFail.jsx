import { Link } from "react-router-dom";
import { PiWarningCircleFill } from "react-icons/pi";

const TokenFail = () => {
  return (
    <div className="restricted">
      <PiWarningCircleFill size={95} />
      <h3>You must log in to do this task</h3>
      <Link to={"/auth?mode=login"}>
        <span>Login Here</span>
      </Link>
      <Link to={"/auth?mode=singup"}>
        <p>
          Don't have an account ? <span>Click here to Create </span>
        </p>
      </Link>
    </div>
  );
};

export default TokenFail;
