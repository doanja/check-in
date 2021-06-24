import { Meta, Nav, Footer } from 'components';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='content'>
      <Meta />
      <Nav />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
