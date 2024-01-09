import axios from 'axios';
import { cookies, headers } from 'next/headers';

export default async function Home() {
  // const cookieStore = cookies();
  // console.log(cookieStore.get('session'));
  // console.log(cookieStore.get('bodyMan'));
  // console.log('xxxxxxxxxxxxxxxx');
  const currentUser = await getUser();
  console.log(currentUser, 'xxxxxxxxxxxxxxxxxxx');
  // const headersList = headers();
  // console.log(headersList.get('host'));
  // // console.log(headersList.get('cookie')?.includes('session'));
  // const cookies = headersList.get('cookie')?.split('; ');
  // const sessionCookie = cookies?.find((cookie) =>
  //   cookie.startsWith('session='),
  // );

  // if (sessionCookie) {
  //   const sessionValue = sessionCookie.split('=')[1];
  //   console.log(sessionValue);
  // }

  return (
    <>
      <h1>Hello</h1>
    </>
  );
}

const getUser = async () => {
  const headersList = headers();
  console.log(headersList.get('host'));
  // console.log(headersList.get('cookie')?.includes('session'));
  const cookies = headersList.get('cookie')?.split('; ');
  const sessionCookie = cookies?.find((cookie) =>
    cookie.startsWith('session='),
  );

  if (sessionCookie) {
    const sessionValue = sessionCookie.split('=')[1];
    console.log(sessionValue);
  }
  try {
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: {
          host: headersList.get('host'),
          cookie: sessionCookie,
        },
      },
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
