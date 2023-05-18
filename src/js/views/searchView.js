class SearchView {
  #parentEl = document.querySelector('.searchbar');

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('search', function (event) {
      const query = event.target.value;
      handler(query);
      setTimeout(() => {
        event.target.value = '';
      }, 600);
    });
  }

  renderError() {
    const markup = this.errorView();
    document.body.insertAdjacentHTML('beforeend', markup);
    const errorMessage = document.querySelector('.error__message');
    setTimeout(() => {
      errorMessage.remove();
    }, 2900);
  }

  errorView() {
    return `
    <div class="error__message">
      <div class="container">
        <div class="error">
          <p><i class='bx bx-map'></i> City not found!</p>
        </div>
      </div>
    </div>
    `;
  }
}

export default new SearchView();
