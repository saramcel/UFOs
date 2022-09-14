# UFO Sightings Filter

## Overview

The purpose of this analysis is to make the data on UFO sightings more usable for the public. The UFO sightings are in a javascript database, and we are asked to create a series of fitlers so that users can find sightings of interest. The site containing the data can be filtered by date, city, state, country, and shape of the UFO.  

## Results

A user can now use the webpage to filter by search criteria. Page visitors can type in their search criteria for each field, and then press enter to trigger the search. The program will check to see what has changed in each field, and adjust the search criteria as needed, then create a new table with only the rows meeting the criteria. 

### Use Examples

- Users may type in their criteria, following the examples set by the placeholder text.
![This is an image](https://myoctocat.com/assets/images/base-octocat.svg)

- Users may use as many or few criteria as they would like.
  - Example 1: Use only a few filters on the data.
![This is an image](https://myoctocat.com/assets/images/base-octocat.svg)

  - Example 2: Use all filters to find an exact incident.
 ![This is an image](https://myoctocat.com/assets/images/base-octocat.svg)
  
- By clearing the criteria, users can access the whole database again.
![This is an image](https://myoctocat.com/assets/images/base-octocat.svg)

### Code

The code works by listening for a change to the filter fields, then updating the filter list, then matching each key from the filter list to the data key, and then setting the values for that key equal to the value provided by the user, then returning just those rows.

1. The code listens for a change using a D3 event.
> d3.selectAll("input").on("change", updateFilters);

2. The code updates the list of filters with the id and value of the changed elements. First it extracts the value of the user input, then the id of the html element, then then it adds to the list called `filters` and assures that any unused filters that may be in the list are deleted. Then it calls the next function `filterTable` and adds the `filters` list as an argument.
```
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let changedElement = d3.select(this);
    
    // 4b. Save the value that was changed as a variable.
    let elementValue = changedElement.property("value");
    //log the element in the console to check it
    console.log(elementValue);
    
    // 4c. Save the id of the filter that was changed as a variable.
    let filterId = changedElement.attr("id");
    // log the filterId to the console to check it
    console.log(filterId);
    
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (elementValue) {
      filters[filterId] = elementValue;
    }
    else {
      delete filters[filterId];
    }
    // 6. Call function to apply all filters and rebuild the table
    filterTable(filters);
  
  }
  ```
  
  3. This code first sets the new table `filteredData` equal to the whole table `tableData` so that we start with all of the data each time. Then it uses a forEach loop to go through each existing element of the `filters` list, select table rows by the filter key, and return the ones that are *exactly* equal to the value input by the user for that key. Then it calls the function to build a new table with the filtered data. 
  
  ```
   // 7. Use this function to filter the table when data is entered.
  function filterTable(filters) {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(filters).forEach(([key, value]) => {
      // get datetime value from filter
     filteredData = filteredData.filter(row => row[key] === value);
    });
   
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);  
  }
  ```
  

## Summary

In a summary statement, describe one drawback of this new design and two recommendations for further development.
Deliverable 2 Requirements
Structure, Organization, and Formatting (8 points)
The written analysis has the following structure, organization, and formatting:

There is a title, and there are multiple paragraphs. (2 pt)
Each paragraph has a heading. (2 pt)
There are subheadings to break up text. (2 pt)
Images are formatted and displayed where appropriate. (2 pt)
Analysis (12 points)

## The written analysis has the following:

Overview of the analysis:
The purpose is well defined (2 pt)
 


Summary:
The summary addresses one drawback of this webpage (2 pt)
The summary addresses two additional recommendations for further development (4 pt)
