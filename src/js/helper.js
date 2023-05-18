const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const monthsOfYear = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const formatFullDate = function (datetime) {
  const date = new Date(datetime);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const monthOfYear = monthsOfYear[date.getMonth()];
  const dayOfMonth = date.getDate();

  const formattedDate = `${dayOfWeek} ${dayOfMonth}.${monthOfYear} ${date.getFullYear()}`;

  return formattedDate;
};

export const formatMonth = function (datetime) {
  const date = new Date(datetime);
  const dayOfWeek = daysOfWeek[date.getDay()];

  const formattedDate = `${dayOfWeek}`;
  return formattedDate;
};

export const formatTime = function (time) {
  const date = new Date(`2000-01-01T${time}`);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedTime = `${formattedHours}:${formattedMinutes}h`;
  return formattedTime;
};
