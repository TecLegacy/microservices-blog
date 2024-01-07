import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRequest } from '@/hooks/useRequest';
import { showToast } from '@/components/ui/sonner';
import { formSchema, FromValue } from '@/lib/validation/formValidation';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export function ProfileForm() {
  const form = useForm<FromValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { doRequest, error } = useRequest({
    url: '/api/users/signup',
    method: 'post',
  });

  async function onSubmit(values: FromValue) {
    console.log(values);
    await doRequest(values);
  }

  if (error && error.length > 0) {
    error.forEach((e) => showToast(e.message));
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email@test.com" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div>
        <ul>
          {error && error?.map((e) => <li key={e.message}>{e.message}</li>)}
        </ul>
      </div>
    </>
  );
}
