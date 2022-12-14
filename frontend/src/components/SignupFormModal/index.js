import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="modal-button"onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
