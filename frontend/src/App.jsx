import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layout/Main";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import { loader as PostsLoader } from "./pages/Posts";
import {
  loader as SinglePostLoader,
  action as DeletePostAction,
} from "./components/PostDetail";
import { action as PostCreateAction } from "./components/PostForm";
import { action as PostEditAction } from "./components/PostForm";
import PostDetail from "./components/PostDetail";
import Edit from "./pages/Edit";
import Error from "./components/Error";

const router = createBrowserRouter([
  {
    path: "",
    element: <Main />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Posts />, loader: PostsLoader },
      {
        path: "/create-post",
        element: <CreatePost />,
        action: PostCreateAction,
      },
      {
        path: ":id",
        id: "post-details",
        loader: SinglePostLoader,
        children: [
          {
            index: true,
            element: <PostDetail />,
            action: DeletePostAction,
          },
          { path: "edit-post", element: <Edit />, action: PostEditAction },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
