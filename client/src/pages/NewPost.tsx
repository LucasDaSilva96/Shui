'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/lib/errorCatch';
import { useNavigate } from 'react-router-dom';
import { useLoadingStore } from '@/services/loadingStore';
import { createPost } from '@/services/api';

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' }),
  text: z.string().min(2, { message: 'Text must be at least 2 characters.' }),
});

export default function NewPost() {
  const navigate = useNavigate();
  const { setIsLoading, setNotLoading } = useLoadingStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      username: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!values.username || !values.text)
        throw new Error('Please fill out all fields');
      setIsLoading(true);
      await createPost(values);

      navigate('/');
      toast({
        variant: 'default',
        title: 'Post created successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: getErrorMessage(error),
      });
    } finally {
      setNotLoading();
    }
  }

  return (
    <section className='w-full flex flex-col items-center gap-2 p-4'>
      <h1 className='text-2xl font-bold text-secondary'>Create New Post</h1>
      <div className='min-w-[370px] max-w-md w-full'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full max-w-md bg-secondary p-2 rounded-md flex flex-col gap-4'
          >
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>User name</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete='false' />
                  </FormControl>
                  <FormDescription className='sr-only'>
                    Edit the post user name here
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='text'
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>Edit Post</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete='false' />
                  </FormControl>
                  <FormDescription className='sr-only'>
                    Edit the post text here
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='mt-4'>
              Submit
            </Button>
            <Button
              type='button'
              className='mt-4 ml-4'
              variant={'secondary'}
              onClick={() => navigate('/')}
            >
              Back
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
