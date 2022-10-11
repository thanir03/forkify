// Model (for state management)
import * as config from '../config.js';
import { AJAXRequest, getJSON, sendJSON } from '../helpers.js';

export const readLocalStorage = function (name) {
  return JSON.parse(localStorage.getItem(name));
};

export const state = {
  recipe: {},
  searchResult: {
    query: '',
    recipe: [],
    page: 1,
    resultsPerPage: config.RESULT_PER_PAGE,
    maxPage: 1,
  },
  bookmark: readLocalStorage('bookmark') ?? [],
  uploadedRecipe: [],
  currentUploadedRecipe: {},
};

const getMaxPage = function () {
  return Math.ceil(
    state.searchResult.recipe.length / state.searchResult.resultsPerPage
  );
};

export const fetchRecipeDetails = async function (id) {
  try {
    const recipeURL = `${config.API_URL}${id}?key=${config.API_KEY}`;
    const data = await AJAXRequest(recipeURL);
    state.recipe = data.data.recipe;
    if (isBookmarked(state.recipe)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (error) {
    throw error;
  }
};

export const fetchSearchResults = async function (query) {
  try {
    state.searchResult.query = query;
    const searchURL = `${config.API_URL}?search=${query}&key=${config.API_KEY}`;
    const data = await AJAXRequest(searchURL);
    state.searchResult.recipe = data.data.recipes;
    state.searchResult.maxPage = getMaxPage();
    state.searchResult.page = 1;
  } catch (error) {
    throw error;
  }
};

export const getSearchResultPage = function (page = 1) {
  state.searchResult.page = page;
  const start = (page - 1) * state.searchResult.resultsPerPage;
  const end = page * state.searchResult.resultsPerPage;
  return state.searchResult.recipe.slice(start, end);
};

export const updateServingData = function (servingsNumber) {
  console.log(servingsNumber);
  const newServing = servingsNumber;
  const currentServing = state.recipe.servings;
  state.recipe.ingredients.forEach(item => {
    if (!item.quantity) return;
    item.quantity = (item.quantity / currentServing) * newServing;
  });
  state.recipe.servings = newServing;
};

export const convertJSON = function (data) {
  const ingreadiantData = Object.entries(data)
    .filter(([key, value]) => {
      return key.startsWith('ingredient') && value;
    })
    .map(([_, value]) => {
      const ingreadiantArray = value.replaceAll(' ', '').split(',');
      if (ingreadiantArray.length !== 3) throw new Error('Invalid format');
      const [quantity, unit, description] = ingreadiantArray;
      return {
        quantity: quantity ? +quantity : null,
        unit: unit ?? '',
        description: description,
      };
    });

  data = Object.fromEntries(
    Object.entries(data).filter(([key, _]) => !key.startsWith('ingredient'))
  );
  data.ingredients = ingreadiantData;
  state.currentUploadedRecipe = data;
};

export const postUploadedData = async function () {
  try {
    const URL = `${config.API_URL}?key=${config.API_KEY}`;
    const responseData = await AJAXRequest(URL, state.currentUploadedRecipe);
    state.recipe = responseData.data.recipe
    state.currentUploadedRecipe = {}
  } catch (error) {
    throw error;
  }
};


export const addBookmark = function (recipe) {
  state.bookmark.push(state.recipe);
  state.recipe.bookmarked = true;
};
export const removeBookmark = function (id) {
  const index = state.bookmark.findIndex(item => item.id === id);
  state.bookmark.splice(index, 1);
  state.recipe.bookmarked = false;
};

export const writeLocalStorage = function (name, data) {
  localStorage.setItem(name, JSON.stringify(data));
};

export const isBookmarked = function (recipe) {
  return state.bookmark.some(element => element.id === recipe.id);
};

//   there is a live connection between import and exports

// MODEL => FETCH DATA & MANAGE STATE
