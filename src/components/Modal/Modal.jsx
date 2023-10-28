import React, { Component } from 'react';
import css from './Modal.module.css';

import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleModalCloseKeyDown);
    document.body.style.overflow = 'hidden';
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleModalCloseKeyDown);
    document.body.style.overflow = 'visible';
  }

  handleModalClose = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  handleModalCloseKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };
  render() {
    const { largeImageURL, tags } = this.props;

    return (
      <div className={css.overlay} onClick={this.handleModalClose}>
        <div className={css.modal}>
          <button className={css.closeButton} onClick={this.handleModalClose}>
            X
          </button>
          <img src={largeImageURL} alt={tags} className={css.largeImage} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default Modal;
