import icons from 'url:../../img/icons.svg';
import { View } from './view';

// Search result view

export class ResultView extends View {
  _parentElement = document.querySelector(`.results`);
  _data;
  _errorMessage = `No recipes found for your query! Please try again ;)`;

  _generateMarkup() {
    return this._data.map(this._generatePreviewMarkup).join('\n');
  }

  _generatePreviewMarkup(result) {
    let { id, image_url, title, publisher , key } = result;
    
    return `
    <li class="preview">
        <a class="preview__link ${
          id === window.location.hash.slice(1) ? 'preview__link--active' : ''
        }" href="#${id}">
            <figure class="preview__fig">
            <img src="${image_url}" alt="${title}" />
            </figure>
            <div class="preview__data">
            <h4 class="preview__title">${title}</h4>
            <p class="preview__publisher">${publisher}</p>
            </div>
            <div class="preview__user-generated ${key ? "" : "hidden"}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
        </div>
        </a>
    </li>`;
  }
}

export default new ResultView();

// user uploaded recipes
