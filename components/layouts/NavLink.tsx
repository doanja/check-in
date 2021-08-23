import Link from 'next/link';

interface NavLinkProps {
  linkTo: string;
  linkText: string;
}

const NavLink = ({ linkTo, linkText }: NavLinkProps) => {
  return (
    <Link href={`/${linkTo}`}>
      <a className='block uppercase md:inline-block hover:text-gray-600 px-3 py-3 border-b-2 border-gray-900 md:border-none'>{linkText}</a>
    </Link>
  );
};

export default NavLink;
