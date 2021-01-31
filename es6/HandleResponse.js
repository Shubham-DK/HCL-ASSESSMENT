/*
This modules only responsbility is to handle responses and forwad it to DataManager module
*/

const storeData = require("./DataMananger.js");

const handleResponse = function (message) {
  // called when the client receives a STOMP message from the server
  if (message.body) {
    let data = JSON.parse(message.body);
    storeData(data);
  } else {
    alert("got empty message");
  }
};
module.exports = handleResponse;
