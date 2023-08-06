import axios from 'axios';
import { FC, useState } from 'react';

interface CreatePostsProps {
  k?: string;
}

const CreatePosts: FC<CreatePostsProps> = ({ k = 's' }) => {
  const [title, setTitle] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:4000/posts', {
        title,
      });
      setTitle('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-xl mx-auto'>
      <div className='flex flex-col items-center bg-gray-100 p-6 rounded-xl shadow-lg'>
        <label htmlFor='input-text' className='mb-4 text-lg font-semibold'>
          Input Text
        </label>
        <input
          type='text'
          id='input-text'
          className='px-4 py-2 border border-gray-300 rounded-md mb-4 w-full'
          value={title}
          onChange={handleInputChange}
          aria-label='Input Text' // ARIA label for screen readers
          required // Requires input before form submission
        />
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          aria-label='Submit' // ARIA label for screen readers
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreatePosts;
