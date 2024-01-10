import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';
class resultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found!';
  _generateHTML() {
    return this._data
      .map(results => previewView.render(results, false))
      .join('');
  }
}
export default new resultsView();
