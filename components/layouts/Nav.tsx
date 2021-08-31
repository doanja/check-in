import { useState } from 'react';
import { NavLink } from '@/components';
import { useEffect } from 'react';
// import env from '@/lib/env';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(true);
  const closeMenu = () => !showMenu && setShowMenu(!showMenu);

  useEffect(() => {
    console.log(`test message: process.env`, process.env);
  }, []);

  return (
    <nav className='flex flex-wrap items-center justify-between p-2 md:p-4 text-white'>
      {/* logo */}
      <div className='flex items-center'>env.siteName</div>

      {/* hamburger */}
      <div className='flex md:hidden'>
        <button onClick={() => setShowMenu(!showMenu)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`${showMenu ? 'block' : 'hidden'} h-8 w-8`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
          </svg>

          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`${showMenu && 'hidden'} h-8 w-8 `}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
      </div>

      {/* nav links */}
      <div
        className={` ${showMenu && 'hidden'} md:flex w-full md:w-auto text-right text-bold mt-5 md:mt-0 border-t-2 border-white md:border-none`}
        onClick={closeMenu}>
        <NavLink linkTo='' linkText='home' />
        <NavLink linkTo='signup' linkText='sign-up' />
        <NavLink linkTo='waitlist' linkText='waitlist' />
      </div>
    </nav>
  );
};

export default Navbar;
