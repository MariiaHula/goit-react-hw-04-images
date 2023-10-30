import React, { useEffect, useCallback, useReducer } from 'react';
import css from './App.module.css';
import { fetchGalerryItems } from '../../servises/axiosAPI';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/Loader/Loader';
import { initialState, imagesReducer } from 'imagesReduser/reduser';

export const App = () => {
  const [state, dispatch] = useReducer(imagesReducer, initialState);
  const { loading, error, images, inputValue, page, totalHits } = state;

  //=============================API===========================================================
  const updateGallery = useCallback(
    async (inputValue, page) => {
      try {
        dispatch({ type: 'loading', payload: true });
        const { hits, totalHits } = await fetchGalerryItems(inputValue, page);
        if (hits.length > 0) {
          dispatch({ type: 'renderImages', payload: hits });
          dispatch({ type: 'setTotalHits', payload: totalHits });
        }
        if (!inputValue) {
          return;
        }
        if (totalHits > 0 && page === 1) {
          toast.success(`hooray, we found ${totalHits} pictures`);
        }
        if (totalHits === 0) {
          dispatch({ type: 'setError', payload: error });
          toast.error(`sorry, something went wrong...`);
        }
      } catch (error) {
        dispatch({ type: 'setError', payload: error.message });
        toast.error(error.message);
      } finally {
        dispatch({ type: 'loading', payload: false });
      }
    },
    [error]
  );
  //==========================================================================================

  useEffect(() => {
    updateGallery(inputValue, page);
  }, [inputValue, page, updateGallery]);

  const handleChangeSubmit = query => {
    if (query === inputValue) {
      toast.info(`oops...duplicate search`);
      return;
    }
    dispatch({ type: 'setInputValue', payload: query });
  };

  const loadMore = () => {
    dispatch({ type: 'loadMore' });
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
