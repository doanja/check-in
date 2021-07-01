import { Meta, Nav, Footer, Modal } from 'components';
import { ModalContext } from 'contexts/ModalContext';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [showModal, toggleModal] = useState(false);
  const [title, setTitle] = useState('Test');
  const [body, setBody] = useState('body test');

  return (
    <ModalContext.Provider value={{ showModal, toggleModal, title, setTitle, body, setBody }}>
      <div className='content'>
        <Meta />
        <Nav />
        <div className='h-screen'>{children}</div>
        <Footer />
        <Modal toggleModal={toggleModal} showModal={showModal} title={title} body={body} />
      </div>
    </ModalContext.Provider>
  );
};

export default Layout;
