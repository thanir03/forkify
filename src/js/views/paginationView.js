import { View } from './view';
import icons from 'url:../../img/icons.svg';

// protected fields are used instead of private class fiels => private class fields cannot yet inherit in the parent class

// page view

class PaginationView extends View {
  _parentElement = document.querySelector(`.pagination`);
  _page;
  _totalPages;

  _generateMarkup() {
    this._page = this._data.page
    this._totalPages = this._data.maxPage;
    const pageButtons = this._generateMarkupBtn();
    const markup = `${pageButtons[0]} ${pageButtons[1]}`;
    return markup;
  }

  _generateMarkupBtn() {
    let noButton = '';

    const getMarkupPreview = (hasIncrease) => {
      const page = hasIncrease ? this._page + 1 : this._page - 1;
      console.log(page);
      return `
        <button class="btn--inline pagination__btn--${
          hasIncrease ? 'next' : 'prev'
        }" data-goto = ${page}>
            <span>Page ${page}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-${hasIncrease ? "right":"left"}"></use>
            </svg>
        </button>
    `;
    };

    if (this._page === 1 && this._totalPages > 1) {
      return [noButton, getMarkupPreview(true)];
    } else if (this._page === this._totalPages && this._page > 1) {
      return [getMarkupPreview(false), noButton];
    } else if (this._page < this._totalPages) {
      return [getMarkupPreview(false), getMarkupPreview(true)];
    } else {
      return [noButton, noButton];
    }
  }

  addEventHandler(eventHandler) {
    this._parentElement.addEventListener('click', function (event) {
      const clickedBtn = event.target.closest('.btn--inline');
      if (!clickedBtn) return;
      const goToPage = +clickedBtn.dataset.goto;
      eventHandler(goToPage);
    });
  }
}

export default new PaginationView();
