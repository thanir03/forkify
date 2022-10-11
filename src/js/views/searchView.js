import { View } from "./view";

// input field to search an item


class SearchView extends View {
  _parentElement = document.querySelector(`.search`); //form element

  addHandlerSearch(eventHandler) {
    ['submit'].forEach(event =>
      this._parentElement.addEventListener(event, event => {
        event.preventDefault();
        eventHandler();
      })
    );
  }

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearSearchInput();
    return query;
  }

  _clearSearchInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
