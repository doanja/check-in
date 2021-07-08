import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <div className='logo'>
        <h1>Check In</h1>
      </div>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/signup'>
        <a>Sign-Up</a>
      </Link>
      <Link href='/signin'>
        <a>Sign-In</a>
      </Link>
      <Link href='/waitlist'>
        <a>Waitlist</a>
      </Link>
    </nav>
  );
};

export default Navbar;
