import { Meta } from 'components';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Meta />

      <div className='layout-bottom'>{children}</div>
    </>
  );
};

export default Layout;
