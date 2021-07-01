import { Meta, Nav, Footer } from 'components';
import { ModalContext } from '@/contexts/ModalContext';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [showModal, toggleModal] = useState(false);

  return (
    <ModalContext.Provider value={{ showModal, toggleModal }}>
      <div className='content'>
        <Meta />
        <Nav />
        <div className='h-screen border-solid border-black'>{children}</div>
        <Footer />
      </div>
    </ModalContext.Provider>
  );
};

export default Layout;
