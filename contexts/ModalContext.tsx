import { createContext, useContext } from 'react';

export type ModalContextType = {
  showModal: boolean;
  toggleModal: ToggleModal;
  title: string;
  setTitle: setTextField;
  body: string;
  setBody: setTextField;
};

export const ModalContext = createContext<ModalContextType>({
  showModal: false,
  toggleModal: () => {},
  title: 'Error',
  setTitle: () => {},
  body: 'An unexpected error has occured.',
  setBody: () => {},
});

export const useModal = () => useContext(ModalContext);
