'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/Button';
import { signUp } from '@/lib/validation/formValidation';

import { FC, useState } from 'react';
import { z } from 'zod';
interface PageProps {}

type FormValue = z.infer<typeof signUp>;
const Page: FC<PageProps> = ({}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: zodResolver(signUp),
  });
  const [showPass, setShowPass] = useState(false);
  const showPassHandler = () => {
    console.log('show pass');
    setShowPass(!showPass);
  };

  function onSubmit(data: FormValue) {
    // addFriend(data.email);

    console.log(data);
  }
  return (
    <>
      <form className=" max-w-sm  " onSubmit={handleSubmit(onSubmit)}>
        <div className=" m-2  p-2">
          {/* EMAIL */}
          <div className=" mb-2 flex flex-col gap-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2 flex gap-4">
              <input
                {...register('email', { required: true })}
                autoComplete="email"
                placeholder={`Email@Please.🌐`}
                type="text"
                id="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-2 flex flex-col gap-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2 flex gap-4">
              <input
                {...register('password', { required: true })}
                placeholder={`"Secret Handshake"`}
                type={showPass ? 'text' : 'password'}
                id="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="my-2 flex items-center justify-end gap-4">
              Show Password
              <input
                className="rounded-sm border-red-200 bg-red-100 text-red-500 focus:ring-1 focus:ring-red-200 active:ring-0"
                type="checkbox"
                id="showPassword"
                onClick={showPassHandler}
              />
            </div>
          </div>

          <div className="flex items-center justify-stretch">
            <Button size="lg" className="">
              Add
            </Button>
          </div>
        </div>

        {/* <p className='mt-1 text-sm text-red-600'>{errors.email?.message}</p>
        {showSuccessState ? (
          <p className='mt-1 text-sm text-green-600'>Friend request sent!</p>
        ) : null} */}
      </form>
    </>
  );
};

export default Page;
