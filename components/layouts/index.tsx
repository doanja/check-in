import { Meta, Nav, Footer, Modal } from '@/components';
import { ModalContext, MemoryContext } from '@/contexts';
import { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [showModal, toggleModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('Test');
  const [body, setBody] = useState<string>('body test');

  const [checkedInUsers, setCheckedInUsers] = useState<CheckedInUser[]>([]);

  useEffect(() => {
    const loadFromLocalStorage = () => {
      const data = localStorage.getItem('waitlist');
      return data ? JSON.parse(data) : [];
    };

    const waitlist = loadFromLocalStorage();

    if (waitlist.length > 0) {
      setCheckedInUsers(waitlist);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('waitlist', JSON.stringify(checkedInUsers));
  }, [checkedInUsers]);

  return (
    <MemoryContext.Provider value={{ checkedInUsers, setCheckedInUsers }}>
      <ModalContext.Provider value={{ showModal, toggleModal, title, setTitle, body, setBody }}>
        <div className='layout-wrap'>
          <Meta />
          <Nav />
          <Modal toggleModal={toggleModal} showModal={showModal} title={title} body={body} />
          <main className='main-wrap'>{children}</main>
          <Footer />
        </div>
      </ModalContext.Provider>
    </MemoryContext.Provider>
  );
};

export default Layout;
