import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';

function BookingLoginModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="button-create-booking" onClick={() => setShowModal(true)}>Log In to Reserve</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default BookingLoginModal;
