import { useNavigate, useParams } from 'react-router-dom';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { deletePost } from '@/services/api';
import { useLoadingStore } from '@/services/loadingStore';
import { toast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/lib/errorCatch';

export default function DeletePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setIsLoading, setNotLoading } = useLoadingStore();

  async function handleDelete() {
    try {
      if (!id) {
        throw new Error('No post id found');
      }
      setIsLoading(true);
      await deletePost(id);
      navigate(-1);
      toast({
        variant: 'default',
        title: 'Post deleted',
        description: `Post with id ${id} has been deleted`,
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
    <section className='text-secondary w-full p-4 flex justify-center items-center flex-col gap-5'>
      <Alert variant='destructive'>
        <ExclamationTriangleIcon className='h-4 w-4' />
        <AlertTitle>Delete</AlertTitle>
        <AlertDescription>
          This action can't be undone. Are you sure you want to delete this
          post?
        </AlertDescription>
      </Alert>

      <div className='w-full flex items-center justify-center gap-16'>
        <Button variant={'secondary'} onClick={handleDelete}>
          Yes
        </Button>
        <Button variant={'destructive'} onClick={() => navigate(-1)}>
          No
        </Button>
      </div>
    </section>
  );
}
