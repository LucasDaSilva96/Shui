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
import { useEffect, useState } from 'react';
import type { Post } from '@/types/post.types';
import { getPost, updatePost } from '@/services/api';
import { toast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/lib/errorCatch';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoadingStore } from '@/services/loadingStore';

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' }),
  text: z.string().min(2, { message: 'Text must be at least 2 characters.' }),
});

export default function EditPost() {
  const [post, setPost] = useState<Post | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { setIsLoading, setNotLoading } = useLoadingStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: post?.text || '',
      username: post?.username || '',
    },
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) throw new Error('No post id provided');
        setIsLoading(true);
        const post = await getPost(id);
        setPost(post);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: getErrorMessage(error),
        });
      } finally {
        setNotLoading();
      }
    };

    fetchPost();
    if (post) {
      form.reset({ text: post.text, username: post.username });
    }
  }, [id, post?.id]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!id) {
      return toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'No post id provided',
      });
    }
    if (values.text === post?.text && values.username === post?.username) {
      return toast({
        variant: 'default',
        title: 'No changes detected',
        description: 'Please make some changes before submitting',
      });
    }

    try {
      await updatePost(id, {
        text: values.text,
        username: values.username,
      });
      navigate(-1);
      toast({
        variant: 'default',
        title: 'Post updated successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: getErrorMessage(error),
      });
    }
  }

  if (!post)
    return <h1 className='text-center p-4 animate-bounce'>Loading...</h1>;

  return (
    <section className='w-full h-[91dvh] flex flex-col items-center justify-center'>
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
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </form>
      </Form>
    </section>
  );
}
