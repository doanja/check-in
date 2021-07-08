import Link from 'next/link';

interface NavButtonProps {
  showMenu: boolean;
  linkTo: string;
  linkText: string;
}

const NavButton = ({ showMenu, linkTo, linkText }: NavButtonProps) => {
  return (
    <Link href={`/${linkTo}`}>
      <a
        className={`${
          showMenu && 'hidden'
        } capitalize md:flex w-full md:w-auto px-4 py-2 text-right bg-blue-900 hover:bg-blue-500 text-white md:rounded`}>
        {linkText}
      </a>
    </Link>
  );
};

export default NavButton;
