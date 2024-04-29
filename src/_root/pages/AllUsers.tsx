import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { useGetUsers } from "@/lib/react-query/queriesAndMutaion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  // State to hold user ID
  const [userId, setUserId] = useState('');
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user ID only if the user object exists
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  let president = '6604884b5b79441d58de';

  // If user ID is not the allowed ID, redirect to another page
  useEffect(() => {
    // Redirect only if userId is not empty and it's not the allowed ID
    if (userId && userId !== president) {
      navigate('/noaccess');
    }
  }, [userId, navigate]);

  const { toast } = useToast();

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });

    return;
  }

  const TotalUsers = () => {
    const { data, isLoading, isError } = useGetUsers();
    // Call the custom hook to fetch users

    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (isError) {
      return <p>Error fetching users</p>;
    }

    const totalUsers = data ? data.total : 0;

    const str = `Total members of the club :  ${totalUsers}`

    return (
      <>
        <h1>{str}</h1>

      </>
    );
  };

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full text-gray-200">All Members</h2>
        <div className="text-gray-50 w-full text-center"> <TotalUsers /></div>
       
        {isLoading && !creators ? (
          <Loader />
        ) : (
           <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
