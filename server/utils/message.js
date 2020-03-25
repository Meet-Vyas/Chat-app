var moment = require('moment');

var generateMessage = (from, text) => {
  // returns an object
  return {
    from: from,
    text: text,
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage = (from, lat, long) => {
  return {
    from: from,
    url: `https://www.google.com/maps?=${lat},${long}`,
    createdAt: moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocationMessage};
