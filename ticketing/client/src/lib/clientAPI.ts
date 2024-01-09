import axios from 'axios';
import { headers } from 'next/headers';

/**
 *  returns { currentUser: null } if no active session
 *  else {
    currentUser: {
    id: '659cd8a9ac94631481a57827',
    email: 'test@test.com',
    iat: 1704777898
  }} 
 */
//
export const getUser = async () => {
  const headersList = headers();

  const cookies = headersList.get('cookie')?.split('; ');
  const sessionCookie = cookies?.find((cookie) =>
    cookie.startsWith('session='),
  );

  // if (sessionCookie) {
  //   const sessionValue = sessionCookie.split('=')[1];
  //   console.log(sessionValue);
  //   console.log(headersList.get('host'));
  // }
  try {
    // K8s ingress clusterIp - cross namespace communication with Pods
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
    console.error(error);
  }
};
