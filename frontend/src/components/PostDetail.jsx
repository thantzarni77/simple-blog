import {
  Link,
  redirect,
  useSubmit,
  json,
  useRouteLoaderData,
  useNavigate,
} from "react-router-dom";
import { getToken } from "../utils/auth";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegCalendarMinus } from "react-icons/fa6";

const PostDetail = () => {
  const navigate = useNavigate();
  const isToken = useRouteLoaderData("root");
  const post = useRouteLoaderData("post-details");

  const submit = useSubmit();
  const { description, image, title, date } = post.post;

  const deleteHandler = () => {
    const confirmStatus = window.confirm("Are You Sure ?");
    if (confirmStatus) {
      submit(null, { method: "DELETE" });
    } else {
      return;
    }
  };

  return (
    <div className="postDetailWrapper">
      <div className="postTitle">
        <h3>{title}</h3>
        <Link to={"/"}>
          <FaArrowLeftLong
            size={35}
            className="leftArrow"
            onClick={() => navigate("/")}
          />
        </Link>
      </div>
      <div className="postedOn">
        <FaRegCalendarMinus size={22} />
        <p>{date}</p>
      </div>
      <img src={image} alt={title} />
      <p>{description}</p>
      {isToken && (
        <div className="detailsFooter">
          <Link to={"edit-post/"}>
            <p>Edit</p>
          </Link>
          <p onClick={deleteHandler}>Delete</p>
        </div>
      )}
      <hr />
    </div>
  );
};

export default PostDetail;

export const loader = async ({ request, params }) => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_DOMAIN}/posts/${params.id}`
  );
  if (!response.ok) {
    throw json({ message: "Failed to Load the Post" }, { status: 408 });
  } else {
    const post = await response.json();
    return post;
  }
};

export const action = async ({ request, params }) => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_DOMAIN}/posts/${params.id}`,
    {
      method: request.method,
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: "Something Wrong, Can't delete the post" },
      { status: 400 }
    );
  } else {
    return redirect("/");
  }
};
