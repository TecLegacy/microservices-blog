import { useRef } from 'react';
import axios from 'axios';
const PostCreate = () => {
  //   const [title, setTitle] = useState('');
  const titleRef = useRef();

  const submitHandler = async event => {
    event.preventDefault();
    const postTitle = titleRef.current.value;

    //Send data /posts - title
    try {
      console.log(postTitle);
      await axios.post('http://posts.com/posts/create', {
        title: postTitle,
      });
      console.log('data sent');
    } catch (err0r) {
      console.log(err0r);
    } finally {
      titleRef.current.value = '';
    }
  };

  return (
    <>
      <section className=' max-w-md mx-auto  '>
        <form
          onSubmit={submitHandler}
          className=' flex flex-col justify-center p-4 gap-4'
        >
          <label htmlFor='title'> Enter Your Post title</label>
          <input type='text' placeholder=' Title' ref={titleRef} />
          <button>submit</button>
        </form>
      </section>
    </>
  );
};

export default PostCreate;
