import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";

import { LikedPosts } from "@/_root/pages";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutaion";
import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";

interface StatBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StatBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-gray-200">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const { data: currentUser, isLoading } = useGetUserById(id || "");

  if (isLoading || !currentUser) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const isCurrentUser = currentUser.$id === user.id;
  const hasPosts = currentUser.posts.length > 0;
  // const isNewUser = !hasPosts;

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full text-gray-200">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser.username}
              </p>
            </div>

            {/* Display Followers and Following Stats */}
            {/* Add your StatBlock components here for Followers and Following */}

            <p className="small-medium md:base-medium text-center xl:text-left mb-7 mt-4 max-w-screen-sm text-gray-200">
              {currentUser.bio}
            </p>

            {/* Display Posts or "New User" message */}
            <StatBlock
              value={hasPosts ? currentUser.posts.length : "New User"}
              label={hasPosts ? "Posts" : ""}
            />
          </div>

          {/* Edit Profile Button (Visible only for current user) */}
          {isCurrentUser && (
            <Link
              to={`/update-profile/${currentUser.$id}`}
              className="h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg"
            >
              <img
                src={"/assets/icons/edit.svg"}
                alt="edit"
                width={20}
                height={20}
              />
              <p className="flex whitespace-nowrap small-medium">Edit Profile</p>
            </Link>
          )}
        </div>
      </div>

      {/* Navigation Tabs (Posts, Liked Posts) */}
      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${pathname === `/profile/${id}` && "bg-dark-3"}`}
          >
            <img src={"/assets/icons/posts.svg"} alt="posts" width={20} height={20} />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${pathname === `/profile/${id}/liked-posts` && "bg-dark-3"}`}
          >
            <img src={"/assets/icons/like.svg"} alt="like" width={20} height={20} />
            Liked Posts
          </Link>
        </div>
      )}

      {/* Render Posts or "No posts" message */}
      <Routes>
        <Route
          index
          element={
            hasPosts ? (
              <GridPostList posts={currentUser.posts} showUser={false} />
            ) : (
              <p className="text-center mt-4 text-gray-200">No posts yet</p>
            )
          }
        />
        {isCurrentUser && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
