// 'use client';
import Button from '@/components/ui/Button';

import toast from 'react-hot-toast';
export default function Home() {
  // const notify = () => toast('Here is your toast.');
  return (
    <>
      <h1>Hello</h1>
      <h2>Landing Page</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        velit, nisi illum dolores culpa quae inventore rerum placeat voluptatem
        incidunt impedit minus totam, praesentium rem asperiores iure quibusdam
        illo corrupti.
      </p>
      <div className=" bg-white ">check </div>
      <button className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
        ...
      </button>

      {/* <Button onClick={notify}> w </Button> */}
    </>
  );
}
