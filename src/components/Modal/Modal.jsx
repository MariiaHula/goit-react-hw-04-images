import React, { useEffect } from 'react';
import css from './Modal.module.css';

import PropTypes from 'prop-types';

const Modal = ({ largeImageURL, tags, onCloseModal }) => {
  useEffect(() => {
    const handleModalCloseKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    document.addEventListener('keydown', handleModalCloseKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleModalCloseKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [onCloseModal]);

  const handleModalClose = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleModalClose}>
      <div className={css.modal}>
        <button className={css.closeButton} onClick={handleModalClose}>
          X
        </button>
        <img src={largeImageURL} alt={tags} className={css.largeImage} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
