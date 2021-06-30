import { Meta, Nav, Footer } from 'components';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='content'>
      <Meta />
      <Nav />
      <div className='h-screen border-solid border-black'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
