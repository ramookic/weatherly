import * as model from './model.js';
import appView from './views/appView.js';
import searchView from './views/searchView.js';
import currentLocationView from './views/currentLocationView.js';

// Get location from Search bar
const searchResult = async function (query) {
  try {
    await model.getCoords(query);
    renderWeather();
  } catch (err) {
    searchView.renderError();
    console.log(err);
  }
};

searchView.addHandlerSearch(searchResult);

// Get location from User
const getCoords = async function (position) {
  try {
    const { latitude, longitude } = position.coords;
    await model.getLocation(latitude, longitude);
    renderWeather();
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
      getCoords.bind(this),
      async function () {
        try {
          await model.getLocation();
          renderWeather();
        } catch (err) {
          console.log(err);
        }
      }
    );
};

init();

const renderWeather = function () {
  appView.render(model.state);
};

currentLocationView.addHandlerClick(init);
