import { View } from './view';

class UploadRecipeView extends View {
  _windowElement = document.querySelector(`.add-recipe-window`);
  _parentElement = document.querySelector(`.upload`);
  _overlayElement = document.querySelector(`.overlay`);
  _openButton = document.querySelector(`.nav__btn--add-recipe`);
  _closeButton = document.querySelector(`.btn--close-modal`);
  _defaultMessage = "Recipe successfully added :)"
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }
  _generateMarkup(){
    const markup = `<div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input value="JAVASCRIPT PIZZA" required name="title" type="text" />
    <label>URL</label>
    <input value="https://www.simplyrecipes.com/recipes/homemade_pizza/" required name="source_url" type="text" />
    <label>Image URL</label>
    <input value="https://www.simplyrecipes.com/thmb/RheeF949ewwGy7pxQQNt5v63Oi0=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1c-c2b1885d27d4481c9cfe6f6286a64342.jpg" required name="image_url" type="text" />
    <label>Publisher</label>
    <input value="THANIR" required name="publisher" type="text" />
    <label>Prep time</label>
    <input value="30" required name="cooking_time" type="number" />
    <label>Servings</label>
    <input value="4" required name="servings" type="number" />
  </div>
  
  <div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>
    <label>Ingredient 1</label>
    <input value="0.5,kg,Rice" type="text" required name="ingredient-1"
      placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 2</label>
    <input value="1,piece,Avocado" type="text" name="ingredient-2" placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 3</label>
    <input value="1, ,Salt" type="text" name="ingredient-3" placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 4</label>
    <input type="text" name="ingredient-4" placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 5</label>
    <input type="text" name="ingredient-5" placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 6</label>
    <input type="text" name="ingredient-6" placeholder="Format: 'Quantity,Unit,Description'" />
  </div>

  <button class="btn upload__btn">
    <svg>
      <use href="src/img/icons.svg#icon-upload-cloud"></use>
    </svg>
    <span>Upload</span>
  </button>`
  return markup
  }

  _addHandlerShowWindow() {
    [this._openButton].forEach(element =>
      element.addEventListener('click', this.toggleForm.bind(this))
    );
  }

  _addHandlerCloseWindow() {
    [this._closeButton, this._overlayElement].forEach(element =>
      element.addEventListener('click', this.toggleForm.bind(this))
    );
  }
  
  toggleForm() {
    this._windowElement.classList.toggle("hidden")
    this._overlayElement.classList.toggle('hidden');
  }

  addHandlerUpload(eventHandler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      const data = Object.fromEntries([...new FormData(this._parentElement)])  
      eventHandler(data);
    }.bind(this));
  }
}

export default new UploadRecipeView();

// Show hidden form

// Upload Button click (view)
//    Data validation (state)
//    post request (state)
//    Add Bookmark (state & controller)
//    Display user when fetch (view)
const newFeature = function () {
  console.log('Welcome new Feature ');
}