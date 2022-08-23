import './css/styles.css';
import { fetchImages } from './services/api';
import { renderGalleryMarkup } from './renderMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let value = null;

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryDiv: document.querySelector('.gallery'),
  guard: document.querySelector('.js-guard'),
};

let page = 1;

const optionsForObserver = {
  root: null,
  rootMargin: '300px',
  treshold: 1,
};
const observer = new IntersectionObserver(updateList, optionsForObserver);

refs.searchForm.addEventListener('submit', onSearchFormInput);

function updateList(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      if (!value) {
        return;
      }
      fetchImages(value, page)
        .then(response => {
          const markup = renderGalleryMarkup(response);
          refs.galleryDiv.insertAdjacentHTML('beforeend', markup);
          lightbox.refresh();
          smoothScroll();
          if (response.data.totalHits < page * 40) {
            Notify.failure(
              "We're sorry, but you've reached the end of search results."
            );
            observer.unobserve(refs.guard);
            return;
          }
        })
        .catch(console.log);
    }
  });
}

function onSearchFormInput(event) {
  event.preventDefault();
  value = event.target.elements.searchQuery.value;
  page = 1;
  updateMarkup(value);
}

async function updateMarkup(value) {
  if (!value) {
    refs.galleryDiv.innerHTML = '';
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  try {
    const response = await fetchImages(value, page);
    if (response.data.hits.length === 0) {
      refs.galleryDiv.innerHTML = '';
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
    refs.galleryDiv.innerHTML = '';
    const markup = renderGalleryMarkup(response);
    refs.galleryDiv.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    observer.observe(refs.guard);
  } catch (error) {
    console.log(error.message);
  }
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
    


