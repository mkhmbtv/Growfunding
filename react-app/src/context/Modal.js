import { createContext, useState, useRef, useEffect, useContext } from "react";
import ReactDOM from "react-dom";

const ModalContext = createContext();

export default function ModalProvider ({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
};

export const Modal = ({ onClose, children }) => {
  const modalNode = useContext(ModalContext);

  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="fixed inset-0 bg-black-rgba" onClick={onClose} />
      <div className="absolute bg-white w-3/6">{children}</div>
    </div>,
    modalNode
  );
};