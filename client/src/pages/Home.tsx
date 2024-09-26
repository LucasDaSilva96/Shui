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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSortPostsStore } from '@/services/SortPostsStore';
import dayjs from 'dayjs';
dayjs().format();

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setIsLoading, setNotLoading } = useLoadingStore();
  const { setSortMessage, sortMessage } = useSortPostsStore();

  const sortedPosts = () => {
    if (sortMessage === 'Ascending') {
      setSortMessage('Descending');
      setPosts(
        [...posts].sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)))
      );
    } else {
      setSortMessage('Ascending');
      setPosts(
        [...posts].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      );
    }
  };

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

  if (posts.length === 0)
    return (
      <h1 className='text-2xl font-bold text-secondary py-8 text-center'>
        No posts found
      </h1>
    );

  return (
    <section className='w-full h-full flex flex-col items-center p-2 relative'>
      <div className='self-start flex items-center gap-2 px-2 py-2 bg-secondary/40 rounded-md'>
        <Switch
          id='SortPost'
          onCheckedChange={sortedPosts}
          checked={sortMessage === 'Descending'}
        />
        <Label htmlFor='sortPost' className='text-secondary'>
          Sort Posts {sortMessage}
        </Label>
      </div>

      <h1 className='text-2xl font-bold text-secondary pb-8'>All Posts</h1>
      <div className='w-full h-full flex flex-wrap gap-4'>
        {posts.map((post) => (
          <Card
            key={post.id}
            className='min-w-[375px] min-h-[300px] flex flex-col items-center justify-evenly relative'
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
                <Button
                  variant={'destructive'}
                  onClick={() => navigate(`deletePost/${post.id}`)}
                >
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
