import  { ResultView } from './resultsView';

class BookmarkView extends ResultView {
  _parentElement = document.querySelector(`.bookmarks__list`);
  _errorMessage = ` No bookmarks yet. Find a nice recipe and bookmark it :)`;
  

  addEventHandler(eventHandler){
    window.addEventListener("load" , eventHandler)
  }
}

export default new BookmarkView()

// Event Listener for bookmark
// Bookmark btn in the recipe clicked
// => Update the bookmark in the modal and local Storage
// => Render the bookmark in the Bookmark View
// =>
