import axios from 'axios';
import { FC } from 'react';

interface PageProps {}

const Page: FC<PageProps> = async ({}) => {
  const d = await Work();
  console.log('its working', d);
  return <div>Page</div>;
};

async function Work() {
  const res = await axios
    .get('http://auth-srv:3000/api/users/currentuser')
    .catch((err) => console.log(err)); //Posts Service
  const resT = await axios
    .get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: {
          host: 'ticketing.dev',
        },
      },
    )
    .catch((err) => console.log(err)); //Posts Service
  return resT;
}

export default Page;
