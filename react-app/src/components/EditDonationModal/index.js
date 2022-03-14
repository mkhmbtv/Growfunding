import { useState } from "react";
import { Modal } from "../../context/Modal";
import EditDonationForm from "./EditDonationForm";

const EditDonationModal = ({ donation }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        className="border-b border-secondary hover:bg-secondary hover:text-white duration-200 px-1 mr-3"
        onClick={() => setShowModal(true)}>
        Change donation
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditDonationForm donation={donation} handleClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default EditDonationModal;