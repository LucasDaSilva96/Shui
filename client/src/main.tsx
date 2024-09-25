import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import NewPost from './pages/NewPost.tsx';
import EditPost from './pages/EditPost.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'newPost',
        element: <NewPost />,
      },
      {
        path: 'editPost/:id',
        element: <EditPost />,
      },
    ],
    ErrorBoundary: () => {
      return <div>404 Page not found</div>;
    },
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>
);
