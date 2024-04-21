import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { checkIsLiked } from "@/lib/utils";
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutaion";

type PostStatsProps = {
    post: Models.Document;
    userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
    const location = useLocation();

    const likesList = post.likes?.map((user: Models.Document) => user?.$id) || [];
    const [likes, setLikes] = useState<string[]>(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const { mutate: likePost } = useLikePost();
    const { mutate: savePost } = useSavePost();
    const { mutate: deleteSavePost } = useDeleteSavedPost();

    const { data: currentUser } = useGetCurrentUser();

    useEffect(() => {
        if (currentUser) {
            const savedPostRecord = currentUser.save?.find(
                (record: Models.Document) => record?.post?.$id === post?.$id
            );
            setIsSaved(!!savedPostRecord);
        }
    }, [currentUser, post]);

    const handleLikePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();
        let updatedLikes = [...likes];

        if (updatedLikes.includes(userId)) {
            updatedLikes = updatedLikes.filter(id => id !== userId);
        } else {
            updatedLikes.push(userId);
        }

        setLikes(updatedLikes);
        likePost({ postId: post?.$id, likesArray: updatedLikes });
    };

    const handleSavePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();

        if (currentUser) {
            const savedPostRecord = currentUser.save?.find(
                (record: Models.Document) => record?.post?.$id === post?.$id
            );

            if (savedPostRecord) {
                setIsSaved(false);
                deleteSavePost(savedPostRecord.$id);
            } else {
                savePost({ userId: userId, postId: post?.$id });
                setIsSaved(true);
            }
        }
    };

    const containerStyles = location.pathname.startsWith("/profile") ? "w-full" : "";

    return (
        <div className={`flex justify-between items-center z-20 ${containerStyles}`}>
            <div className="flex gap-2 mr-5">
                <img
                    src={`/assets/icons/${checkIsLiked(likes, userId) ? 'liked' : 'like'}.svg`}
                    alt="like"
                    width={20}
                    height={20}
                    onClick={(e) => handleLikePost(e)}
                    className="cursor-pointer"
                />
                <p className="small-medium lg:base-medium text-white">{likes.length}</p>
            </div>

            <div className="flex gap-2">
                <img
                    src={`/assets/icons/${isSaved ? 'saved' : 'save'}.svg`}
                    alt="share"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={(e) => handleSavePost(e)}
                />
            </div>
        </div>
    );
};

export default PostStats;
