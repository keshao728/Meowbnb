import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
// import UpdateSpot from './index';
import './SingleSpotBrowser.css'

function MeowCoverModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="meow-button" onClick={() => setShowModal(true)}>Learn more</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='meow-wrapper'>
            <div className='meow-heading'>
              <div className='meow-exit' onClick={() => setShowModal(false)}>x</div>
              <img className="meow-aircover-pic" src="https://imgur.com/0SJuCdh.png" />
              <div>MeowCover is comprehensive protection included for free with every booking.</div>
            </div>

            <div className='all-meows'>
              <div className='meow-individual'>
                <div className='meow-title'>
                  Booking Protection Guarantee
                </div>
                <div className='meow-des'>
                  In the unlikely event a Host needs to cancel your booking within 30 days of check-in, we’ll find you a similar or better home, or we’ll refund you.
                </div>
              </div>


              <div className='meow-individual'>
                <div className='meow-title'>
                  Check-In Guarantee
                </div>
                <div className='meow-des'>
                  If you can’t check into your home and the Host cannot resolve the issue, we’ll find you a similar or better home for the length of your original stay, or we’ll refund you.                </div>
              </div>

              <div className='meow-individual'>
                <div className='meow-title'>
                  Get-What-You-Booked Guarantee
                </div>
                <div className='meow-des'>
                  If at any time during your stay you find your listing isn't as advertised—for example, the refrigerator stops working and your Host can’t easily fix it, or it has fewer bedrooms than listed—you'll have three days to report it and we’ll find you a similar or better home, or we’ll refund you.
                </div>
              </div>
              <div className='meow-individual'>
                <div className='meow-title'>
                  24-hour Safety Line
                </div>
                <div className='meow-des'>
                  If you ever feel unsafe, you’ll get priority access to specially-trained safety agents, day or night.
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default MeowCoverModal;
