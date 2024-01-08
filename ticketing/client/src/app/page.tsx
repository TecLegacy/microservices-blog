// 'use client';
import axios from 'axios';
export default async function Home() {
  const da = await data();
  // const d = await getUser();
  console.log('clean');
  console.log(da?.data.id);
  return (
    <>
      <h1>Hello</h1>
    </>
  );
}

// async function getUser() {
// const response = await fetch(
//   'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
//   {
//     headers: {
//       host: 'ticketing.dev',
//     },
//   },
// );

//   const response = await fetch('http://auth-srv/api/users/currentuser');
//   console.log(response);
//   if (!response.ok) throw new Error('Bad request');

//   const data = response.json();
//   return data;
// }
// async function getUser() {
//   try {
//     // const response = await fetch('http://auth-srv/api/users/currentuser');
//     const response = await fetch(
//       'https://jsonplaceholder.typicode.com/posts/1',
//     );
//     // console.log(response);
//     if (!response.ok) throw new Error('Bad request');

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     // throw error; // re-throw the error if you want it to propagate
//   }
// }

// async function getUser() {
//   try {
//     const response = await fetch('http://auth-srv/api/users/currentuser');
//     if (!response.ok) throw new Error('Bad request');

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     // throw error;
//   }
// }
async function data() {
  try {
    // const response = await fetch(
    //   // 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
    //   // 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
    //   'https://jsonplaceholder.typicode.com/posts/1',
    //   {
    //     headers: {
    //       host: 'ticketing.dev',
    //     },
    //   },
    // );
    const res = await axios.get('/posts/1', {
      headers: {
        host: 'jsonplaceholder.typicode.com',
      },
    });
    // if (!dam.ok) {
    //   throw new Error('Network response was not ok');
    // }

    // // const response = await fetch('http://auth-srv/api/users/currentuser');
    // const response = await fetch('http://auth-srv/api/users/currentuser');
    // // console.log(response);
    // if (!response.ok) throw new Error('Bad request');

    return res;
  } catch (error) {
    console.error('Error fetching user:', error);
    // throw error; // re-throw the error if you want it to propagate
  }
}
