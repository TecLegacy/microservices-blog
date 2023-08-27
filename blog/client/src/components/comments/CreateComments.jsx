import axios from 'axios';
import { useRef } from 'react';
import PropTypes from 'prop-types';

const CreateComments = ({ id }) => {
  const commentRef = useRef();
  const commentSubmitHandler = async e => {
    e.preventDefault();

    try {
      await axios.post(`http://posts.com/posts/${id}/comments`, {
        content: commentRef.current.value,
      });
      commentRef.current.value = 'comment created';
    } catch (error) {
      console.log('Comments Error');
    }
  };
  return (
    <div className=' w-5/6 mx-auto'>
      <form
        onSubmit={commentSubmitHandler}
        className=' flex flex-col  justify-center gap-4  p-2'
      >
        <label htmlFor='comments' />
        <input
          type='text'
          id='comments'
          ref={commentRef}
          className=' rounded-md'
          placeholder='   Add a new Comment'
        />
        <button>New Comment</button>
      </form>
    </div>
  );
};

CreateComments.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CreateComments;
