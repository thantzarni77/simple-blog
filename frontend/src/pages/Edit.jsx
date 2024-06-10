import { useRouteLoaderData } from "react-router-dom";
import PostForm from "../components/PostForm";

const Edit = () => {
  const oldPostData = useRouteLoaderData("post-details");
  return (
    <div>
      <PostForm
        header="Edit Post"
        bthText="Update"
        oldPostData={oldPostData.post}
        method="patch"
      />
    </div>
  );
};

export default Edit;
