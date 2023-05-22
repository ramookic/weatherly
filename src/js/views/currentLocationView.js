class CurrentLocationView {
  parentEl = document.querySelector('.current__location');

  addHandlerClick(handler) {
    this.parentEl.addEventListener('click', function () {
      handler();
    });
  }
}

export default new CurrentLocationView();
