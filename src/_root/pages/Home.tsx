
import Loader from '@/components/shared/Loader';
import Loader1 from '@/components/shared/Loader1';
import PostCard from '@/components/shared/PostCard';
import { useUserContext } from '@/context/AuthContext';
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutaion';
import { Models } from 'appwrite';

const Home = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts();
  const { user } = useUserContext();

  
  return (
    <div className='flex flex-1'>
      
      <div className='home-container'>
          <div className='home-posts'>
            <h2 className='h3-bold md:h2-bold w-full text-center text-gray-50'>Picture Gallery</h2>
            <div>
            <p className='text-gray-500 w-full text-center'>Your userID is :</p>
            {isPostLoading ? (
              <Loader />
            ) : (
              <p className='text-gray-50'>
                {user.id ? ` ${user.id}` : 'User ID not available'}
              </p>
            )}
            </div>
          


            {isPostLoading && !posts ? (
              <Loader1/>
            ): (
              <ul className='flex flex-col flex-1 gap-9 w-full'>
                  {posts?.documents.map((post: Models.Document) => (
                    <PostCard post={post}/>
                  ))}
              </ul>
            )}
          </div>
      </div>
    </div>
  )
}

export default Home
