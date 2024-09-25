import Navigation from '@/components/Navigation';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <main className='w-full h-screen overflow-hidden'>
      <Navigation />
      <Outlet />
    </main>
  );
}

export default App;
