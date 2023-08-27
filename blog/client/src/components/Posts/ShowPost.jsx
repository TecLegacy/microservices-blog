import axios from 'axios';
import { useEffect, useState } from 'react';

import CreateComments from '../comments/CreateComments';
import ShowComments from '../comments/ShowComments';

const ShowPost = () => {
  const [responseQuery, setResponseQuery] = useState([]);
  useEffect(() => {
    // Fetch Post data from query service
    const fetchPosts = async () => {
      try {
        const query = await axios.get('http://posts.com/posts');

        // Query service response is an object with key value pairs
        const queryResponse = Object.values(query.data);
        setResponseQuery(queryResponse);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
    return () => {};
  }, []);

  const PostList = responseQuery.map(element => (
    <div className='check' key={element.id}>
      <div>
        <h2 className=' text-lg font-bold tracking-wide pl-4'>
          {element.title.toUpperCase()}
        </h2>
        <div className=' ml-8 py-4'>
          <ShowComments comments={element.Comments} />
        </div>
      </div>

      {/* POST comments  */}
      <CreateComments id={element.id} />
    </div>
  ));
  return (
    <>
      <hr />
      <h1 className=' my-4'>Posts</h1>
      <div className=' w-5/6  mx-auto flex items-center flex-wrap  '>
        {PostList}
      </div>
    </>
  );
};

export default ShowPost;
