import React, { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, webformatURL, largeImageURL, tags }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToglleModal = () => {
    setIsOpen(prev => !prev);
  };
  return (
    <li className={css.galleryItem} id={id}>
      <img
        src={webformatURL}
        alt={tags}
        onClick={handleToglleModal}
        className={css.galleryImage}
      />
      {isOpen && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onCloseModal={handleToglleModal}
        />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
