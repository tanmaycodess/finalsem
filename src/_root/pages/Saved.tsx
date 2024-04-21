import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutaion";
import { Models } from "appwrite";
import { useState } from "react";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();
  const [savePosts] = useState<Models.Document[]>(currentUser?.save || []);

  // const handledeleteSavedPost = (postId: string) => {
  //   // Perform deletion logic here
  //   // For example, call a function to delete the saved post from the server
  //   // After successful deletion, update the savePosts array
  //   setSavePosts(prevPosts => prevPosts.filter(post => post.post.$id !== postId));
  // };

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full text-gray-200">Saved Photos</h2>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList
              posts={savePosts.map(savePost => ({
                ...savePost.post,
                creator: {
                  imageUrl: currentUser.imageUrl,
                },
              }))}
              showStats={false}
            />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
