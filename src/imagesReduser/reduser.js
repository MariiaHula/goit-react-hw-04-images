export const initialState = {
  loading: false,
  error: null,
  images: [],
  inputValue: '',
  page: 1,
  totalHits: 0,
};

export const imagesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'loading':
      return {
        ...state,
        loading: payload,
      };
    case 'renderImages':
      return {
        ...state,
        images: [...state.images, ...payload],
      };
    case 'setTotalHits':
      return {
        ...state,
        totalHits: payload,
      };
    case 'setError':
      return {
        ...state,
        error: payload,
      };

    case 'loadMore':
      return {
        ...state,
        page: state.page + 1,
      };
    case 'setInputValue':
      return {
        ...state,
        inputValue: payload,
        images: [],
        page: 1,
      };

    default:
      return state;
  }
};
