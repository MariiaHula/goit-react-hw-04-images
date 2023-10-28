import React, { useEffect, useState } from 'react';
import css from './App.module.css';
import { fetchGalerryItems } from '../../servises/axiosAPI';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/Loader/Loader';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, settotalHits] = useState(0);
  const [prevInputValue, setPrevInputValue] = useState('');
  const [prevPage, setPrevPage] = useState(0);

  useEffect(() => {
    if (prevPage !== page || prevInputValue !== inputValue) {
      updateGallery(inputValue, page);
      setPrevInputValue(inputValue);
      setPrevPage(page);
    }
  }, [inputValue, page, prevInputValue, prevPage]);
  //=============================API===========================================================
  const updateGallery = async (inputValue, page) => {
    try {
      setLoading(true);
      const { hits, totalHits } = await fetchGalerryItems(inputValue, page);
      showMessage(totalHits, prevInputValue === inputValue);
      if (hits.length > 0) {
        setImages(prev => [...prev, ...hits]);
        settotalHits(totalHits);
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  //==========================================================================================
  const showMessage = (totalHits, firstRender) => {
    if (firstRender) {
      return;
    }
    if (totalHits > 0) {
      toast.success(`hooray, we found ${totalHits} pictures`);
    } else {
      toast.error(`sorry, something went wrong...`);
    }
  };

  const handleChangeSubmit = query => {
    if (query === inputValue) {
      toast.info(`oops...duplicate search`);
      return;
    }
    setInputValue(query);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className={css.app}>
      <SearchBar addedNewSearchValue={handleChangeSubmit} />
      {loading && <Loader />}
      <ImageGallery images={images} />
      {images.length > 0 && images.length < totalHits ? (
        <Button onLoadMore={loadMore} />
      ) : null}
    </div>
  );
};

// async componentDidUpdate(_, prevState) {
//   const { inputValue, page } = this.state;

//   if (prevState.page !== page || prevState.inputValue !== inputValue) {
//     this.setState({ loading: true });
//     this.getDataGallery({ inputValue, page });
//     setTimeout(() => {
//       if (!this.state.images.length || page > 1) {
//         return;
//       } else {
//         toast.success(`hooray, we found ${this.state.totalHits} pictures`);
//       }
//     }, 500);
//   }
// }
