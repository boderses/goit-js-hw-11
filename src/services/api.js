import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class getApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  async getApiService() {
    const apiData = new URLSearchParams({
      image_type: 'photo&orientation=horizontal',
      q: `${this.searchQuery}`,
      page: `${this.page}`,
      per_page: `${this.per_page}`,
      safesearch: true,
      key: '29414581-04780822c1d2ceb9af08e1854',
    });
    const response = await axios.get(`?${apiData}`);
    return await response.data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}