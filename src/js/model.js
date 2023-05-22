import { API_KEY } from './config.js';
import { formatFullDate, formatMonth, formatTime } from './helper.js';

export const state = {
  currentConditions: {},
  weatherCurrent: {},
  weatherForecast: {},
  location: {},
  alert: {},
};

const storeData = function (data) {
  data.days.forEach(el => {
    el.formattedDate = formatMonth(el.datetime);
  });
  const [weatherCurrent, ...weatherForecast] = data.days;
  state.weatherCurrent = weatherCurrent;
  state.weatherForecast = weatherForecast.slice(0, 7);
  state.currentConditions = data.currentConditions;
  state.weatherCurrent.hours.forEach(el => {
    el.formattedDate = formatTime(el.datetime);
  });
  state.currentConditions.fullFormattedDate = formatFullDate(
    weatherCurrent.datetime
  );
  state.currentConditions.sunriseFormatted = formatTime(
    state.currentConditions.sunrise
  );
  state.currentConditions.sunsetFormatted = formatTime(
    state.currentConditions.sunset
  );
  data.alerts.length === 0
    ? (state.alert = {})
    : (state.alert = data.alerts[0].description);
};

export const getCoords = async function (city) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${city}&format=json`
    );
    if (!res.ok) throw new Error(`${res.status} Location not found`);

    const [data] = await res.json();
    await getLocation(data.lat, data.lon);
  } catch (err) {
    throw err;
  }
};

export const getLocation = async function (
  lat = '51.5287398',
  lng = '-0.2664029'
) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    if (!res.ok) throw new Error(`${res.status} Location not found`);

    const data = await res.json();
    state.location = {
      place:
        data.address.village ||
        data.address.town ||
        data.address.city ||
        data.address.city_district,
      country: data.address.country,
    };
    await getData(state.location.place);
  } catch (err) {
    throw err;
  }
};

export const getData = async function (city) {
  try {
    const res = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}&contentType=json`,
      {
        method: 'GET',
        headers: {},
      }
    );
    if (!res.ok) throw new Error(`${res.status} Location not found`);

    const data = await res.json();
    storeData(data);
  } catch (err) {
    throw err;
  }
};
