import icons from 'url:../../img/icons.svg';
export default class View {
  render(data, condition = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.errorHandler();
    this._data = data;
    const html = this._generateHTML();
    if (!condition) return html;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
  update(data) {
    this._data = data;
    const newHtml = this._generateHTML();
    const newDom = document.createRange().createContextualFragment(newHtml);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newElement, i) => {
      const currElement = currElements[i];

      // console.log(newElement.firstChild?.nodeValue.trim());
      if (
        !newElement.isEqualNode(currElement) &&
        newElement.firstChild?.nodeValue.trim() !== ''
      )
        currElement.textContent = newElement.textContent;

      if (!newElement.isEqualNode(currElement))
        Array.from(newElement.attributes).forEach(attr =>
          currElement.setAttribute(attr.name, attr.value)
        );
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const html = `
    <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  errorHandler(message = this._errorMessage) {
    const html = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  successRender(message = this._message) {
    const html = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
}
