import { useState } from 'react';

import NavLink from './NavLink';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(true);
  const closeMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav>
      {/* logo */}
      <img src='https://www.wilsonfamilychiropracticcenter.net/wp-content/uploads/2018/12/placeholder-logo-2.png' alt='ACME' width='120' />

      {/* hamburger */}
      <div className='flex md:hidden'>
        <button onClick={closeMenu}>
          <img
            className={`${showMenu ? 'block' : 'hidden'}`}
            src='https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png'
            width='40'
            height='40'
          />
          <img className={`${showMenu && 'hidden'}`} src='https://img.icons8.com/fluent-systems-regular/2x/close-window.png' width='40' height='40' />
        </button>
      </div>

      {/* nav links */}
      <div
        className={` ${showMenu && 'hidden'} md:flex w-full md:w-auto text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none`}
        onClick={closeMenu}>
        <NavLink linkTo='' linkText='home' />
        <NavLink linkTo='signup' linkText='sign-up' />
        <NavLink linkTo='signin' linkText='sign-in' />
        <NavLink linkTo='waitlist' linkText='waitlist' />
      </div>
    </nav>
  );
};

export default Navbar;
