class CurrentLocationView {
  parentEl = document.querySelector('.current__location');

  addHandlerClick(handler) {
    this.parentEl.addEventListener('click', function (event) {});
  }
}

export default new CurrentLocationView();
