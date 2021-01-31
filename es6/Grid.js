/*
This modules creates the table and update it dynamically based on response
*/
const tableHeader = document.getElementById("table-header");
const tableBody = document.getElementById("table-body");
let needsHeader = true;

//Function to Update Table based on Map object
function updateTable(tableDataMap) {
  //loop for creating rows
  for (let [key, value] of tableDataMap) {
    //create header if not present
    if (needsHeader) {
      for (let j in value) {
        let column = document.createElement("th");
        let columnName = document.createTextNode(j);
        tableHeader.appendChild(column);
        column.appendChild(columnName);
      }
      needsHeader = false;
    }
    //if row exist remove it and then add it with new data
    if (document.getElementById(key)) {
      document.getElementById(key).remove();
      createNewRow(key, value);
    }
    //if row doesnot exist create a new one
    else {
      createNewRow(key, value);
    }
  }
}

//Method to create new row inside the table
function createNewRow(key, value) {
  var tableRow = document.createElement("tr");
  const sparkElement = document.createElement("span");
  const sparkline = new Sparkline(sparkElement);
  //loop to fill each column
  for (let j in value) {
    tableRow.setAttribute("id", key);
    tableBody.appendChild(tableRow);
    //For midprice column
    if (j === "midPrice") {
      let cellContent = document.createElement("td");
      tableRow.appendChild(cellContent);
      cellContent.appendChild(sparkElement);
      sparkline.draw(convert2DArrayTo1DArray(value[j]));
    }
    //For other Columns
    else {
      let cellContent = document.createElement("td");
      let textNode = document.createTextNode(value[j]);
      tableRow.appendChild(cellContent);
      cellContent.appendChild(textNode);
    }
  }
  tableBody.appendChild(tableRow);
}

//Function to update sparkline based on latest data
function updateSparklineInTable(key, midPrice) {
  const rows = document.getElementById("table-body").rows;
  for (let row of rows) {
    if (row.getAttribute("id") === key) {
      let cells = row.cells;
      const sparkElement = cells[row.cells.length - 1].getElementsByTagName(
        "span"
      )[0];
      const sparkline = new Sparkline(sparkElement);
      sparkline.draw(midPrice);
    }
  }
}

//Function to convert 2D array to 1D array
function convert2DArrayTo1DArray(twoDArray) {
  let oneDArray = [];
  let length = twoDArray.length;
  for (var i = 0; i < length; i++) {
    oneDArray = oneDArray.concat(twoDArray[i]);
  }
  return oneDArray;
}

module.exports = {
  updateTable,
  convert2DArrayTo1DArray,
  updateSparklineInTable,
};
