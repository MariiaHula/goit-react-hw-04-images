import React, { Component } from 'react';
import css from './App.module.css';
import { fetchGalerryItems } from '../../servises/axiosAPI';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/Loader/Loader';

export class App extends Component {
  state = {
    loading: false,
    error: null,
    images: [],
    inputValue: '',
    page: 1,
    totalHits: 0,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { inputValue, page } = this.state;
    this.getDataGallery({ inputValue, page });
  }

  async componentDidUpdate(_, prevState) {
    const { inputValue, page } = this.state;

    if (prevState.page !== page || prevState.inputValue !== inputValue) {
      this.setState({ loading: true });
      this.getDataGallery({ inputValue, page });
      setTimeout(() => {
        if (!this.state.images.length || page > 1) {
          return;
        } else {
          toast.success(`hooray, we found ${this.state.totalHits} pictures`);
        }
      }, 500);
    }
  }
  getDataGallery = async ({ inputValue, page }) => {
    try {
      const { hits, totalHits } = await fetchGalerryItems(inputValue, page);
      if (hits.length > 0) {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalHits: totalHits,
        }));
      } else {
        toast.error(`sorry, something went wrong...`);
      }
    } catch (error) {
      this.setState({ error: error.massage });
      console.log(`error: ${error.massage}`);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleChangeSubmit = query => {
    if (query === this.state.inputValue) {
      toast.info(`oops...duplicate search`);
      return;
    }
    this.setState({
      inputValue: query,
      images: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, loading } = this.state;
    return (
      <div className={css.app}>
        <SearchBar addedNewSearchValue={this.handleChangeSubmit} />
        {loading && <Loader />}
        <ImageGallery images={images} />
        {images.length > 0 && images.length < this.state.totalHits ? (
          <Button onLoadMore={this.loadMore} />
        ) : null}
      </div>
    );
  }
}
