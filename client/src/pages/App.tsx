import Loading from '@/components/Loading';
import Navigation from '@/components/Navigation';
import { useLoadingStore } from '@/services/loadingStore';
import { Outlet } from 'react-router-dom';

function App() {
  const isLoading = useLoadingStore((state) => state.isLoading);
  return (
    <main className='w-full bg-primary min-h-screen relative'>
      <Navigation />
      <Outlet />
      {isLoading && <Loading />}
    </main>
  );
}

export default App;
