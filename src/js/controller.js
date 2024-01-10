'strict mode';
import * as model from './model';
import bookmarksView from './views/bookmarksView';
import paginationView from './views/paginationView';
import recipeView from './views/recipeView';
import resultsView from './views/resultsView';
import searchView from './views/searchView';
import addRecipeView from './views/addRecipeView';
//
import 'core-js/actual';
import 'regenerator-runtime/runtime';
import { KEY, MODAL_CLOSE_SEC } from './config';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
  module.hot.accept();
}
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    resultsView.update(model.getSearchPaginated());

    bookmarksView.update(model.state.bookmarks);
    //1. loading recipe
    await model.loadRecipe(id);
    //2. render recipe
    recipeView.render(model.state.recipe);
    // controlUpdateServings();
  } catch (err) {
    recipeView.errorHandler();
  }
};

const controlSearch = async function () {
  try {
    //1) get Query
    const query = searchView.getQuery();
    if (!query) return;

    //2) load data
    await model.loadSearch(query);

    //3) render data
    resultsView.renderSpinner();
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchPaginated());
    //4) render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (btnGoTo) {
  resultsView.render(model.getSearchPaginated(btnGoTo));
  paginationView.render(model.state.search);
};

const controlUpdateServings = function (servings) {
  //1) update servings
  model.updateServings(servings);
  //2) render the recipe
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmark) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    // addRecipeView.toggleWindow();

    //render recipe
    recipeView.render(model.state.recipe);

    //render success
    addRecipeView.successRender();

    //render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //change id in url
    console.log(model.state.recipe);
    window.history.pushState(null, '', `${model.state.recipe.id}#${KEY}`);
    // window.history.back()
    //close modal
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log(err);
    addRecipeView.errorHandler(err.message);
  }
};

const renderBookmarks = function () {
  // if (model.state.bookmarks.length === 0) return;S
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(renderBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlUpdateServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
