import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewSpot from './index';
import './ReviewSpot.css'

function ReviewFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="review-this-spot" onClick={() => setShowModal(true)}>Review This Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewSpot setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default ReviewFormModal;
