var generateMessage = (from, text) => {
  // returns an object
  return {
    from: from,
    text: text,
    createdAt: new Date().getTime()
  };
};

module.exports = {generateMessage};
