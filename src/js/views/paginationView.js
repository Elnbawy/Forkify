import View from './View';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const btnGoTo = +btn.dataset.goto;
      handler(btnGoTo);
    });
  }
  _generateHTML() {
    const currPage = this._data.page;
    const pagesNum = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (currPage === 1 && pagesNum > 1) {
      return this._generateNextButtonHTML(currPage);
    }
    if (currPage === pagesNum && pagesNum > 1) {
      return this._generatePrevButtonHTML(currPage);
    }
    if (pagesNum > currPage) {
      return (
        this._generatePrevButtonHTML(currPage) +
        this._generateNextButtonHTML(currPage)
      );
    }

    return '';
  }

  _generatePrevButtonHTML(currPage) {
    return `          
    <button data-goto="${
      currPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currPage - 1}</span>
    </button>
    `;
  }
  _generateNextButtonHTML(currPage) {
    return `
    <button data-goto="${
      currPage + 1
    }" class="btn--inline pagination__btn--next">
    <span>Page ${currPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
    </button>
    `;
  }
}
export default new paginationView();
