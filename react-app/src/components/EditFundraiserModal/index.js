import { useState } from "react";
import EditFundraiserForm from "./EditFundraiserForm";
import { Modal } from "../../context/Modal";

const EditFundraiserModal = ({ fundraiser }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="py-3 border border-secondary rounded text-secondary w-full font-extrabold
          hover:bg-secondary hover:text-white duration-200"
        onClick={() => setShowModal(true)}>
        Edit Fundraiser
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditFundraiserForm fundraiser={fundraiser} handleClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  )
};

export default EditFundraiserModal;