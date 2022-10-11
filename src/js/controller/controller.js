// Event handlers
import * as model from '../model/model.js';
import recipeView from '../views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime.js'; //convert async await to es5 syntax
import searchView from '../views/searchView.js';
import resultsView from '../views/resultsView.js';
import paginationView from '../views/paginationView.js';
import bookmarkView from '../views/bookmarkView.js';
import uploadRecipeView from '../views/uploadRecipeView.js';
import { getID } from '../helpers.js';
import uploadRecipeView from '../views/uploadRecipeView.js'; // need to import although the uploadRecipeView is not called (reason : to execute the uploadRecipeView)
import { DELAY_TIME_RENDER } from '../config.js';



const controlRecipes = async function () {
  try {
    // 1. Getting the id from the url
    const id = window.location.hash.slice(1);
    if (!id) {
      // Rendering default Message
      recipeView.renderDefaultMessage();
      return;
    }
    // 2. Rendering loading spinner
    recipeView.renderSpinner();
    // 3. API Call
    await model.fetchRecipeDetails(id);
    // 3.5 . to update the active class in the bookmark
    bookmarkView.update(model.state.bookmark);
    // 4. to update the search result with a classList
    resultsView.update(
      model.getSearchResultPage(model.state.searchResult.page)
    );
    //5. render the recipe in the recipe view
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
    recipeView.handleError(error.message);
  }
};

const controlSearchResult = async function () {
  const query = searchView.getQuery().trim().toLowerCase();
  if (!query) return;
  try {
    // 1. Loading for fetching the request
    resultsView.renderSpinner();
    // 2.  API call
    await model.fetchSearchResults(query);
    // 3. Render the data from the state
    controlPagination(model.state.searchResult.page);
  } catch (error) {
    console.log(error);
    resultsView.handleError(error.message);
  }
};

const controlPagination = function (goToPage) {
  // 1. Render the data from the state
  resultsView.render(model.getSearchResultPage(goToPage));
  // 2. Render the pagination
  paginationView.render(model.state.searchResult);
};

const controlServings = function (servingNum) {
  // Update the recipe servings in the state
  model.updateServingData(servingNum);
  // Change the recipe view (not efficient to rerender the entire recipe view)
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  // Check whether current Recipe is bookmarked
  if (model.state.recipe.bookmarked) {
    // Remove current bookmark
    controlRemoveBookmark();
  } else {
    // Add current bookmark
    controlAddBookmarks();
  }
  // update the bookmark button in the recipe view
  recipeView.render(model.state.recipe);
  // Render the latest version of bookmark
  bookmarkView.render(model.state.bookmark);
  // update the bookmark in the local storage
  model.writeLocalStorage('bookmark', model.state.bookmark);
};

const controlRemoveBookmark = function () {
  // remove bookmark in the state
  model.removeBookmark(getID());
};

const controlAddBookmarks = function () {
  // Add bookmark in the state
  model.addBookmark(model.state.recipe);
};

const controlLoadBookmark = function () {
  // on Load event must render the bookmark from the local storage
  bookmarkView.render(model.state.bookmark);
};

const controlUploadRecipe = async function (recipeData) {
  try {
    // render spinner 
    uploadRecipeView.renderSpinner()
    // convert the recipe data from array to json
    model.convertJSON(recipeData);
    // post request 
    await model.postUploadedData();
    // change the hash to the newly added recipe 
    window.history.pushState(null , "" , `#${model.state.recipe.id}`)
    // add it as bookmark
    controlBookmarks();
    // render successfull message
    uploadRecipeView.renderDefaultMessage()
    // timeout to remove the form modal
    await new Promise(function (resolve, reject) {
      setTimeout(() => {
        uploadRecipeView.toggleForm();
        resolve()
      }, DELAY_TIME_RENDER * 1000);
    }) 
    uploadRecipeView.render()
  } catch (error) {
    console.error(error);
    // to handle error 
    uploadRecipeView.handleError(error.message);
  }
};

const init = function () {
  // To add event handlers on views
  searchView.addHandlerSearch(controlSearchResult);
  recipeView.addHandlerRender(controlRecipes);
  paginationView.addEventHandler(controlPagination);
  recipeView.addEventHandlerServings(controlServings);
  recipeView.addEventHandlerBookmark(controlBookmarks);
  bookmarkView.addEventHandler(controlLoadBookmark);
  uploadRecipeView.addHandlerUpload(controlUploadRecipe);
};

init();

// MAIN PART OF THE WEBSITE (USED TO HANDLE EVENTS)

// add recipe details when
// 1. User selects recipe
// 2. Search the recipe by url (hash)

// MVC Architecture

// publisher - subscriber pattern

