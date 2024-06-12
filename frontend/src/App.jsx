import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layout/Main";
import Posts, { loader as PostsLoader } from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import PostDetail, {
  loader as SinglePostLoader,
  action as DeletePostAction,
} from "./components/PostDetail";
import { action as PostCreateAction } from "./components/PostForm";
import { action as PostEditAction } from "./components/PostForm";
import Edit from "./pages/Edit";
import Error from "./components/Error";
import Auth, { action as AuthAction } from "./Auth";
import { loader as LogoutLoader } from "./components/Logout";
import { TokenLoader, checkTokenLoader } from "./utils/auth";
import TokenFail from "./components/TokenFail";

const router = createBrowserRouter([
  {
    path: "",
    element: <Main />,
    errorElement: <Error />,
    id: "root",
    loader: TokenLoader,
    children: [
      { index: true, element: <Posts />, loader: PostsLoader },
      {
        path: "/create-post",
        element: <CreatePost />,
        action: PostCreateAction,
        loader: checkTokenLoader,
      },
      {
        path: "/auth",
        element: <Auth />,
        action: AuthAction,
      },
      {
        path: "/restricted",
        element: <TokenFail />,
      },
      {
        path: "/logout",
        loader: LogoutLoader,
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
          {
            path: "edit-post",
            element: <Edit />,
            action: PostEditAction,
            loader: checkTokenLoader,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
