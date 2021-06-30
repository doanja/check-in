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
      <Link href='/checkin'>
        <a>Checkin</a>
      </Link>
      <Link href='/signup'>
        <a>Signup</a>
      </Link>
    </nav>
  );
};

export default Navbar;
