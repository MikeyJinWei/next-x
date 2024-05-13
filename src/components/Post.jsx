import Link from "next/link";
import { HiDotsHorizontal } from "react-icons/hi";

const Post = ({ post, id }) => {
  return (
    <div className="flex p-3 border-b">
      {/* ?. Optional chaining operator 避免找不到 key 報錯 */}
      <img
        src={post?.profileImg}
        alt="user-img"
        className="w-12 h-12 mr-4 rounded-full"
      />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-sm truncate">{post?.name}</h4>
            <h6 className="text-xs truncate">@{post?.username}</h6>
          </div>
          <HiDotsHorizontal />
        </div>
        <Link href={`/posts/${id}`}>
          <p className="my-3 text-sm text-neutral-800">{post?.text}</p>
        </Link>
        <Link href={`/posts/${id}`}>
          <img src={post?.postImg} className="mr-2 rounded-lg" />
        </Link>
      </div>
    </div>
  );
};

export default Post;
