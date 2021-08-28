import Link from 'next/link';

interface NavLinkProps {
  linkTo: string;
  linkText: string;
}

const NavLink = ({ linkTo, linkText }: NavLinkProps) => {
  return (
    <Link href={`/${linkTo}`}>
      <a className='block uppercase font-medium text-gray-400 px-3 py-3 transition-all duration-300 ease-in hover:text-white md:inline-block md:border-none'>
        {linkText}
      </a>
    </Link>
  );
};

export default NavLink;
