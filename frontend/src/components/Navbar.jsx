import { NavLink, Link, useRouteLoaderData } from "react-router-dom";

const Navbar = () => {
  const isToken = useRouteLoaderData("root");
  return (
    <div className="navbarContainer">
      <div>
        <Link to={"/"} className="logo">
          BLOG.io
        </Link>
      </div>
      <div className="menuContainer">
        <NavLink to={"/"}>Posts</NavLink>
        {isToken && <NavLink to={"/create-post"}>Create Post</NavLink>}
        {!isToken && <NavLink to={"/auth?mode=login"}>Login</NavLink>}
        {isToken && <NavLink to={"/logout"}>Logout</NavLink>}
      </div>
    </div>
  );
};

export default Navbar;
