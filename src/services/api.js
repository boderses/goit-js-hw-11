import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';


export async function fetchImages(value, page = 1) {
  const searchParams = new URLSearchParams({
    key: '29332799-a92cd8e6a78297bd57d7c923a',
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  });
  const response = await axios.get(`?${searchParams}`);
  return response;
}