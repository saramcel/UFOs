// import the data from data.js
const tableData = data;
// Reference the HTML table using d3
var tbody = d3.select("tbody");

//function to build the table
function buildTable(data) {
    // first clear the table of any old data
    tbody.html("");
    
    // make table row tags with "tr" for each data row
    data.forEach((dataRow) => {
    let row = tbody.append("tr");
    
    // add a new cell for each value
    Object.values(dataRow).forEach((val) => {
        // add table data tags
        let cell = row.append("td");
        // add table data values (as opposed to keys)
        cell.text(val);
        }
    );

    });

}


