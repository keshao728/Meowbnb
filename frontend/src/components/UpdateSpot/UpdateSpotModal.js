import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpdateSpot from './index';
import './UpdateSpot.css'

function UpdateSpotModal({id}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="delete-edit" onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateSpot setShowModal={setShowModal} id={id} />
        </Modal>
      )}
    </>
  );
}

export default UpdateSpotModal;
