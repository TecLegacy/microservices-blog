import { FC } from 'react';

interface CreatePostsProps {
  k?: string;
}

const CreatePosts: FC<CreatePostsProps> = ({ k = 's' }) => {
  console.log(k);
  return <div>CreatePosts</div>;
};

export default CreatePosts;
