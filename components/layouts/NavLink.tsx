import Link from 'next/link';

interface NavLinkProps {
  linkTo: string;
  linkText: string;
}

const NavLink = ({ linkTo, linkText }: NavLinkProps) => {
  return (
    <Link href={`/${linkTo}`}>
      <a className='block capitalize md:inline-block text-blue-900 font-bold hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none'>
        {linkText}
      </a>
    </Link>
  );
};

export default NavLink;
