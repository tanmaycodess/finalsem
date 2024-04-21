import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import PostStats from "./PostStats";

type PostCardProps = {
    post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
    const { user } = useUserContext();

    if (!post.creator) return;

    return (
        <div className="post-card">
            <div className="flex-between">
                <div className="flex items-center gap-3">
                    <Link to={`/profile/${post.creator.$id}`}>
                        <img
                            src={
                                post.creator?.imageUrl ||
                                "/assets/icons/profile-placeholder.svg"
                            }
                            alt="creator"
                            className="w-12 lg:h-12 rounded-full"
                        />
                        <p className=" flex-center base-medium lg:body-bold text-gray-100 mt-3">
                            {post.creator.name}
                        </p>
                    </Link>

                    
                </div>

                <Link
                    to={`/update-post/${post.$id}`}
                    className={`${user.id !== post.creator.$id && "hidden"}`}>
                    <img
                        src={"/assets/icons/edit.svg"}
                        alt="edit"
                        width={20}
                        height={20}
                    />
                </Link>
            </div>

            <Link to={`/posts/${post.$id}`}>
                <div className="small-medium lg:base-medium py-5 text-lime-400">
                   
                    <ul className="flex gap-1 ">
                        {post.tags.map((tag: string, index: string) => (
                            <li key={`${tag}${index}`} className="text-light-3 small-regular">
                                #{tag}
                            </li>
                        ))}
                    </ul>
                </div>

                <img
                    src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
                    alt="post image"
                    className="post-card_img"
                />

                <div className="flex flex-col">
                    <div className="flex-center  text-light-3 gap-3">
                        <p className="subtle-semibold lg:small-regular ">
                            {multiFormatDateString(post.$createdAt)}
                        </p>
                        •
                        <p className="subtle-semibold lg:small-regular">
                            {post.location}
                        </p>
                    </div>

                </div>

                <p className="mt-6 mb-6 text-gray-100">{post.creator.name} : {post.caption}</p>
            </Link>

            <PostStats post={post} userId={user.id}/>

        </div>
    );
};

export default PostCard;
