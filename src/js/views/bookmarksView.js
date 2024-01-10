import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class bookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateHTML() {
    return this._data
      .map(bookmarks => previewView.render(bookmarks, false))
      .join('');
  }
}
export default new bookmarksView();
