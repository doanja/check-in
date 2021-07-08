import { useState } from 'react';
import NavButton from './NavButton';
import NavLink from './NavLink';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <nav className='flex flex-wrap items-center justify-between p-5 bg-blue-200'>
      {/* logo */}
      <img src='https://seeklogo.com/images/B/bulbasaur-logo-8A27924C02-seeklogo.com.png' alt='ACME' width='120' />

      {/* hamburger */}
      <div className='flex md:hidden'>
        <button onClick={() => setShowMenu(!showMenu)}>
          <img
            className={`${showMenu ? 'block' : 'hidden'}`}
            src='https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png'
            width='40'
            height='40'
          />
          <img className={`${showMenu && 'hidden'}`} src='https://img.icons8.com/fluent-systems-regular/2x/close-window.png' width='40' height='40' />
        </button>
      </div>

      {/* TODO: clicking links or button toggles menu off */}

      {/* nav links */}
      <div
        className={` ${showMenu && 'hidden'} md:flex w-full md:w-auto text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none`}>
        <NavLink linkTo='' linkText='home' />
        <NavLink linkTo='signup' linkText='sign-up' />
        <NavLink linkTo='signin' linkText='sign-in' />
      </div>

      {/* create acc button */}
      <NavButton showMenu={showMenu} linkTo='waitlist' linkText='waitlist' />
    </nav>
  );
};

export default Navbar;
