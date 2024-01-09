import { getUser } from '@/lib/clientAPI';

export default async function Home() {
  const currentUser = await getUser();
  console.log(currentUser, 'xxxxxxxxxxxxxxxxxxx');

  return (
    <>
      <h1>Hello</h1>
    </>
  );
}
