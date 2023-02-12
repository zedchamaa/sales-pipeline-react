import { createContext } from 'react';

export const ModalContext = createContext({
  showModal: false,
  handleShowModal: () => {},
  handleCloseModal: () => {},
});
