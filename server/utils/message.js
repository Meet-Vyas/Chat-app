var generateMessage = (from, text) => {
  // returns an object
  return {
    from: from,
    text: text,
    createdAt: new Date().getTime()
  };
};

var generateLocationMessage = (from, lat, long) => {
  return {
    from: from,
    url: `https://www.google.com/maps?=${lat},${long}`,
    createdAt: new Date().getTime()
  };
};

module.exports = {generateMessage, generateLocationMessage};
