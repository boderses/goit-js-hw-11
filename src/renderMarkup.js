export function renderGalleryMarkup({ data: { hits } }) {
  return hits.reduce(
    (
      acc,
      { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
    ) => {
      return (
        acc +
        `<li class="photo-card">
         <a href="${largeImageURL}" class="gallery_link">
          <img class="gallery__image" src="${webformatURL}" alt="${tags}" width="370px" loading="lazy" />
          </a>
        <div class="info">
              <p class="info-item">
              <b>Likes<br>${likes}</b>
              </p>
              <p class="info-item">
              <b>Views<br>${views}</b>
              </p>
              <p class="info-item">
              <b>Comments<br>${comments}</b>
              </p>
              <p class="info-item">
              <b>Downloads<br>${downloads}</b>
              </p>
        </div>
    </li>`
      );
    },
    ''
  );
}