import icons from 'url:../../img/icons.svg';

export class View {
  _data;

/** Example of JS DOCS 
 * TO render the data to the DOM 
 * @param {Object | Object[]} data (e.g  : recipe) 
 * @returns void  
 * @this {Object} View Instance 
 * @author Thanirmalai 
 * @todo Finish implementation
 */
  render(data) {
    if (Array.isArray(data) && data.length === 0) {
      return this.handleError();
    }
    this._data = data;

    const markup = this._generateMarkup();
    this._clearHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    
    this._data = data;
    const newMarkup = this._generateMarkup();
    // convert HTML string to dom
    // DOM that is not on the page but in the memory
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // to select all the elements in the DOM
    const newElement = Array.from(newDOM.querySelectorAll('*'));
    const currentElement = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElement.forEach((element, index) => {
      if (
        !currentElement[index].isEqualNode(element) &&
        element.firstChild?.nodeValue.trim() 
      ) {
        currentElement[index].textContent = element.textContent;
      }
      if (!currentElement[index].isEqualNode(element)) {
        Array.from(element.attributes).forEach(attr =>
          currentElement[index].setAttribute(attr.name, attr.value)
        );
      }
    });
    // generate markup and compare the new HTML to the existing HTML
    // only change  the element that has changed
  }

  handleError(message = this._errorMessage) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
      </div> `;
    console.log(message);
      this._clearHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const spinnerHTML = `
        <div class="spinner">
          <svg>
          <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
        `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', spinnerHTML);
  }

  _clearHTML() {
    this._parentElement.innerHTML = '';
  }

  renderDefaultMessage() {
    const markup = `
    <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${this._defaultMessage}</p>
  </div>`;
    this._clearHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
