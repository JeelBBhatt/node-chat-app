var moment=require('moment');
var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocationMessage};

/**************************Time.js***********************/

// var moment=require('moment');
//var timeStamp=moment().valueOf();
// var date=moment();
// console.log(date.format('MMM Do, YYYY'));