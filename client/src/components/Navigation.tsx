import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <header>
      <nav className='flex justify-between items-center p-4 bg-secondary'>
        <div>
          <NavLink to='/' className='text-xl font-bold'>
            Post App
          </NavLink>
        </div>
        <div className='flex items-center gap-5'>
          <NavLink to='/' className=''>
            Home
          </NavLink>

          <NavLink to='/#' className=''>
            New Post
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
