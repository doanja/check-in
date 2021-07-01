import { createContext, useContext } from 'react';

export type ModalContextType = {
  showModal: boolean;
  toggleModal: ToggleModal;
};

export const ModalContext = createContext<ModalContextType>({ showModal: false, toggleModal: showModal => !showModal });
export const useModal = () => useContext(ModalContext);
