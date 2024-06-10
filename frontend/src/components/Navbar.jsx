import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbarContainer">
      <div>
        <Link to={"/"} className="logo">
          BLOG.io
        </Link>
      </div>
      <div className="menuContainer">
        <NavLink to={"/"}>Posts</NavLink>
        <NavLink to={"create-post"}>Create Post</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
