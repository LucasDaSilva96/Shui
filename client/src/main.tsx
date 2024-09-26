import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import NewPost from './pages/NewPost.tsx';
import EditPost from './pages/EditPost.tsx';
import SearchPost from './pages/SearchPosts.tsx';
import { ToastProvider } from './components/ui/toast.tsx';
import DeletePost from './pages/DeletePost.tsx';

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
      {
        path: 'searchPost',
        element: <SearchPost />,
      },
      {
        path: 'deletePost/:id',
        element: <DeletePost />,
      },
    ],
    ErrorBoundary: () => {
      return <div>404 Page not found</div>;
    },
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider duration={1000}>
      <RouterProvider router={router} />
      <Toaster />
    </ToastProvider>
  </StrictMode>
);
