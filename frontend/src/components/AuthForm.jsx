import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

const AuthForm = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const data = useActionData();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <Form className="postFormContainer" method="post">
      <div className="postTitle">
        <h1>{isLogin ? "Login to Your Account" : "Register a new account"}</h1>
      </div>
      {data && data.errors && (
        <ul className="invalidWarning">
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {data && data.message && <p className="invalidWarning">{data.message}</p>}
      <div className="inputField">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          id="email"
          required
        />
      </div>
      <div className="inputField">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter Your password"
          name="password"
          id="password"
          required
        />
      </div>
      <button className="accBtn" disabled={isSubmitting}>
        {isSubmitting ? "SUBMITTING" : isLogin ? "Login" : "Register"}
      </button>
      <div className="acc-check">
        {isLogin ? (
          <p>
            Don't have an account ?{" "}
            <Link to={"/auth?mode=signup"}>Create Now</Link>
          </p>
        ) : (
          <p>
            Already have an account ?{" "}
            <Link to={"/auth?mode=login"}>Login here</Link>
          </p>
        )}
      </div>
    </Form>
  );
};

export default AuthForm;
