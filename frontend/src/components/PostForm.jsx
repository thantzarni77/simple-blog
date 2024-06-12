import {
  Form,
  useActionData,
  Link,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { nanoid } from "nanoid";
import { getToken } from "../utils/auth";

const PostForm = ({ header, btnText, oldPostData, method }) => {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Form className="postFormContainer" method={method}>
      <div className="postTitle">
        <h1>{header}</h1>
        <Link to={"/"}>
          <FaArrowLeftLong
            size={35}
            className="leftArrow"
            onClick={() => navigate("/")}
          />
        </Link>
      </div>
      {data && data.errors.title && (
        <ul className="invalidWarning">{data.errors.title}</ul>
      )}
      <div className="inputField">
        <label htmlFor="title">Tilte</label>
        <input
          type="text"
          placeholder="Enter Post Title"
          name="title"
          id="title"
          required
          defaultValue={oldPostData ? oldPostData.title : ""}
        />
      </div>
      {data && data.errors.image && (
        <ul className="invalidWarning">{data.errors.image}</ul>
      )}
      <div className="inputField">
        <label htmlFor="title">Image Link</label>
        <input
          type="text"
          placeholder="Enter Cover Image Link"
          name="image"
          id="image"
          required
          defaultValue={oldPostData ? oldPostData.image : ""}
        />
      </div>
      {data && data.errors.date && (
        <ul className="invalidWarning">{data.errors.date}</ul>
      )}
      <div className="inputField">
        <label htmlFor="title">Select Date</label>
        <input
          type="date"
          placeholder="Enter Date"
          name="date"
          id="date"
          required
          defaultValue={oldPostData ? oldPostData.date : ""}
        />
      </div>
      {data && data.errors.description && (
        <ul className="invalidWarning">{data.errors.description}</ul>
      )}
      <div className="inputField">
        <label htmlFor="title">Content</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="4"
          required
          defaultValue={oldPostData ? oldPostData.description : ""}
        ></textarea>
      </div>
      <button disabled={isSubmitting}>
        {isSubmitting ? "SUBMITTING" : btnText}
      </button>
    </Form>
  );
};

export default PostForm;

export const action = async ({ request, params }) => {
  const postData = await request.formData();
  const method = request.method;

  const post = {
    id: nanoid(),
    title: postData.get("title"),
    date: postData.get("date"),
    image: postData.get("image"),
    description: postData.get("description"),
  };

  let url = `${import.meta.env.VITE_REACT_APP_DOMAIN}/posts`;

  if (method === "PATCH") {
    const id = params.id;
    url = `${import.meta.env.VITE_REACT_APP_DOMAIN}/posts/${id}`;
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(post),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Can't create the post" }, { status: 500 });
  }
  return redirect("/");
};
