import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  state = {
    isOpen: false,
  };

  handleToglleModal = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };
  render() {
    const { isOpen } = this.state;
    const { id, webformatURL, largeImageURL, tags } = this.props;
    return (
      <li className={css.galleryItem} id={id}>
        <img
          src={webformatURL}
          alt={tags}
          onClick={this.handleToglleModal}
          className={css.galleryImage}
        />

        {isOpen && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onCloseModal={this.handleToglleModal}
          />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
