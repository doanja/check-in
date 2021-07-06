import { Meta, Nav, Footer, Modal } from 'components';
import { ModalContext } from 'contexts/ModalContext';
import { MemoryContext } from 'contexts/MemoryContext';
import { useState } from 'react';
import { useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [showModal, toggleModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('Test');
  const [body, setBody] = useState<string>('body test');

  const [checkedInUsers, setCheckedInUsers] = useState<CheckedInUser[]>([]);

  const loadFromLocalStorage = () => {
    const data = localStorage.getItem('waitlist');
    data ? JSON.parse(data) : [];
  };

  const a = loadFromLocalStorage();
  console.log(`a`, a);

  useEffect(() => {
    localStorage.setItem('waitlist', JSON.stringify(checkedInUsers));
  }, [checkedInUsers]);

  return (
    <MemoryContext.Provider value={{ checkedInUsers, setCheckedInUsers }}>
      <ModalContext.Provider value={{ showModal, toggleModal, title, setTitle, body, setBody }}>
        <div className='layout-container'>
          <Meta />
          <Nav />
          <div className='h-screen'>{children}</div>
          <Footer />
          <Modal toggleModal={toggleModal} showModal={showModal} title={title} body={body} />
        </div>
      </ModalContext.Provider>
    </MemoryContext.Provider>
  );
};

export default Layout;
