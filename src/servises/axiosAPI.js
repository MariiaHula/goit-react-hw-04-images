import axiosInstance from 'axios';

const axios = axiosInstance.create({
  baseURL: 'https://pixabay.com/api/',
});

export const fetchGalerryItems = async (query, page) => {
  const { data } = await axios.get('', {
    params: {
      key: '39403655-1e18babd7f788259efcd023e3',
      orientation: 'horizontal',
      per_page: 12,
      image_type: 'photo',
      page: page,
      q: query,
    },
  });
  return data;
};
