import { useToast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/lib/errorCatch';
import { getAllPosts } from '@/services/api';
import type { Post } from '@/types/post.types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLoadingStore } from '@/services/loadingStore';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setIsLoading, setNotLoading } = useLoadingStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const posts = await getAllPosts();
        setPosts(posts);
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

    fetchPosts();
  }, []);

  if (posts.length === 0) return <h1>No posts found</h1>;

  return (
    <section className='w-full h-full flex flex-wrap p-4 gap-4'>
      {posts.map((post) => (
        <Card
          key={post.id}
          className='w-[375px] h-[300px] flex flex-col items-center justify-evenly relative'
        >
          <CardHeader>
            <CardTitle className='text-center flex flex-col gap-2'>
              <p className='font-bold'>Created: &nbsp;</p>
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
                <p className='font-bold flex flex-col'>Updated at: &nbsp;</p>
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
    </section>
  );
}
