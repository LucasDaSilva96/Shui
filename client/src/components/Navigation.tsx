import { NavLink, useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <header>
      <nav className='flex justify-between items-center p-4 bg-secondary'>
        <div onClick={() => navigate('/')}>
          <span className='text-xl font-bold text-primary cursor-pointer'>
            Post App
          </span>
        </div>

        <div className='flex items-center gap-5'>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Home
          </NavLink>

          <NavLink
            to='/newPost'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            New Post
          </NavLink>

          <NavLink
            to='/searchPost'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Search user's Post
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
