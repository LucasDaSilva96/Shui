import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Loading() {
  return (
    <div className='w-full fixed inset-0 flex items-center justify-center bg-primary/50 backdrop-blur-md z-50'>
      <AiOutlineLoading3Quarters
        className='animate-spin text-secondary'
        size={28}
      />
    </div>
  );
}
