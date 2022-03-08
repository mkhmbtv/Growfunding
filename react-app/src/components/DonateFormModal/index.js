import { useState } from "react";
import DonateForm from "./DonateForm";
import { Modal } from "../../context/Modal";

const DonateFormModal = ({ fundraiserId }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="py-3 bg-secondary rounded text-white w-full font-extrabold
          hover:bg-[#38d9a9] duration-200 shadow hover:shadow-md"
        onClick={() => setShowModal(true)}>
        Donate now
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DonateForm fundraiserId={fundraiserId} handleClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  )
};

export default DonateFormModal;