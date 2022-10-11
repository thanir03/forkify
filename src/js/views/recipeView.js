import icons from 'url:../../img/icons.svg';
import { View } from './view';
import fracty from 'fracty';

// recipe view

class RecipeView extends View {
  _parentElement = document.querySelector(`.recipe`);
  _data;
  _errorMessage = `No recipes found for your query. Please try again!`;
  _defaultMessage = `Start by searching for a recipe or an ingredient. Have fun!`;

  _generateMarkup() {
    let {
      publisher,
      ingredients,
      source_url,
      image_url,
      title,
      servings,
      cooking_time,
      bookmarked,
      key,
    } = this._data;
    
    return `
      <figure class="recipe__fig">
        <img src="${image_url}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${title}</span>
        </h1>
      </figure>
    
      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${cooking_time}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${servings}</span>
          <span class="recipe__info-text">servings</span>
    
          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings"  data-update-to =${
              servings - 1
            }>
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings"  data-update-to =${
              servings + 1
            }>
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
    
        <div class="recipe__user-generated ${key ? "" : "hidden"}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-${
      bookmarked ? 'bookmark-fill' : 'bookmark'
    }"></use>
          </svg>
        </button>
      </div>
    
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._generateMarkupIngrediant(ingredients)}
        </ul>
      </div>
    
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${source_url}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
      `;
  }

  _generateMarkupIngrediant() {
    return this._data.ingredients
      .map(item => {
        let { quantity, unit, description } = item;
        return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          quantity ? fracty(quantity).toString() : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${unit}</span>
          ${description}
        </div>
      </li>
      `;
      })
      .join('\n');
  }

  addHandlerRender(eventHandler) {
    ['hashchange', 'load'].forEach(events =>
      window.addEventListener(events, eventHandler)
    );
  }
  addEventHandlerServings(eventHandler) {
    this._parentElement.addEventListener('click', function (event) {
      const clickedButton = event.target.closest('.btn--tiny');
      if (!clickedButton) return;
      const servingNum = +clickedButton.dataset.updateTo;
      if (servingNum <= 0) return;
      eventHandler(servingNum);
    });
  }

  addEventHandlerBookmark(eventHandler) {
    this._parentElement.addEventListener('click', function (event) {
      const clickedBtn = event.target.closest('.btn--round');
      if (!clickedBtn) return;
      eventHandler();
    });
  }
}

export default new RecipeView();

// DEALS WITH ALL THE UI CHANGES INCLUDING EVENTLISTENERS
