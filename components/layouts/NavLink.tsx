import Link from 'next/link';

interface NavLinkProps {
  linkTo: string;
  linkText: string;
}

const NavLink = ({ linkTo, linkText }: NavLinkProps) => {
  return (
    <Link href={`/${linkTo}`}>
      <a className='block uppercase md:inline-block text-gray-800 hover:text-gray-600 px-3 py-3 border-b-2 border-blue-900 md:border-none'>
        {linkText}
      </a>
    </Link>
  );
};

export default NavLink;
