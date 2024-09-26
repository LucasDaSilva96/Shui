import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Post } from '@/types/post.types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchPost() {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  return (
    <section className='w-full bg-primary text-secondary flex flex-col overflow-y-auto items-center p-4 gap-4'>
      <h1 className='text-2xl font-bold'>Search Posts by user name</h1>

      <div className='flex w-full max-w-sm items-center space-x-2'>
        <Input
          type='text'
          id='username'
          name='username'
          autoComplete='username'
          placeholder='User name'
        />
        <Button type='button' variant={'secondary'}>
          Search
        </Button>
      </div>

      {posts.length > 0 && (
        <div className='w-full h-full flex flex-wrap gap-4'>
          {posts.map((post) => (
            <Card
              key={post.id}
              className='w-[375px] h-[300px] flex flex-col items-center justify-evenly relative'
            >
              <CardHeader>
                <CardTitle className='text-center flex flex-col gap-2'>
                  <p className='font-bold'>Created at: &nbsp;</p>
                  <div>
                    <span className='font-thin'>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span className='font-thin ml-2'>
                      {new Date(post.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='font-medium text-lg'>
                  {post.text}
                </CardDescription>
              </CardContent>
              <CardFooter className='flex flex-col gap-2 text-center'>
                <div>
                  <p className='font-bold'>Posted by:</p>
                  <span className='font-thin'>{post.username}</span>
                </div>

                {post.updatedAt && (
                  <div>
                    <p className='font-bold flex flex-col'>
                      Updated at: &nbsp;
                    </p>
                    <span className='font-thin'>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </span>
                    <span className='font-thin ml-2'>
                      {new Date(post.updatedAt).toLocaleTimeString()}
                    </span>
                  </div>
                )}

                <div className='w-full flex items-center gap-4 mt-auto'>
                  <Button onClick={() => navigate(`editPost/${post.id}`)}>
                    Edit
                  </Button>
                  <Button variant={'destructive'}>Delete</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
