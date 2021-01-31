/*
This Module stores the data and pass it to the Grid Module
*/

const {updateTable,convert2DArrayTo1DArray,updateSparklineInTable} = require("./Grid.js");

//Map to store data coming as a response
let tableDataMap = new Map();

//Refreshes sparkLineData each second
setInterval(() => {
  handleSparklineData();
}, 1000);


//Function to store responses into Map
function storeData(respObject) {
  let data = tableDataMap.get(respObject.name);
  let currentMidPrice = (respObject.bestBid + respObject.bestAsk) / 2;
  //if data already exists
  if (data) {
    data.midPrice[data.midPrice.length - 1].push(currentMidPrice);
    tableDataMap.set(respObject.name, Object.assign({}, data, respObject));
  }
  //For new Data
  else {
    let dataObj = Object.assign({}, respObject, { midPrice: [] });
    dataObj.midPrice.push([currentMidPrice]);
    tableDataMap.set(dataObj.name, dataObj);
  }
  sortMap();
  //Creating Table based on TableMap Data
  updateTable(tableDataMap);
}


//Function to create a sorted map based on lastChangeBid
function sortMap() {
  let valueArr = [...tableDataMap.values()];
  valueArr.sort((a, b) => a.lastChangeBid - b.lastChangeBid);
  //To clear old sequence
  tableDataMap.clear();
  for (let i of valueArr) {
    tableDataMap.set(i.name, i);
  }
}

//Function to keep last 30 secs of sparkline Data
function handleSparklineData() {
  tableDataMap.forEach((val, key) => {
    if (val.midPrice.length < 30) {
      val.midPrice.push([]);
    } else {
      val.midPrice.shift();
      val.midPrice.push([]);
    }
    updateSparklineInTable(key, convert2DArrayTo1DArray(val.midPrice));
  });
}

module.exports = storeData;
