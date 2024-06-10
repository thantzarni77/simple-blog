import { useNavigate } from "react-router-dom";
import { FaRegCalendarMinus } from "react-icons/fa6";

const PostItem = ({ posts }) => {
  const navigate = useNavigate();
  return (
    <div className="postWrapper">
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className="singlePost"
            onClick={() => navigate(`${post.id}`)}
          >
            <img src={post.image} alt={post.title} />
            <div>{post.title}</div>
            <div className="postedOn">
              <FaRegCalendarMinus size={20} />
              <div>
                Posted on <span>{post.date}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostItem;
