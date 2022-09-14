# UFO Sightings Filter

## Overview

The purpose of this analysis is to make the data on UFO sightings more usable for the public. The UFO sightings are in a javascript database, and we are asked to create a series of fitlers so that users can find sightings of interest. The site containing the data can be filtered by date, city, state, country, and shape of the UFO.  

## Results

A user can now use the webpage to filter by search criteria. Page visitors can type in their search criteria for each field, and then press enter to trigger the search. The program will check to see what has changed in each field, and adjust the search criteria as needed, then create a new table with only the rows meeting the criteria. 

### Use Examples

- Users may type in their criteria, following the examples set by the placeholder text.

![Placeholder text](https://github.com/saramcel/UFOs/blob/66eb9e513850ec44a265f28c1f8bae5d148850d0/UFOs-Challenge/static/images/Challenge-placeholders.png)

- Users may use as many or few criteria as they would like.
  - Example 1: Use only a few filters on the data.

![Two fitlers](https://github.com/saramcel/UFOs/blob/66eb9e513850ec44a265f28c1f8bae5d148850d0/UFOs-Challenge/static/images/Challenge-two_filters.png)

  - Example 2: Use all filters to find an exact incident.

![All filters](https://github.com/saramcel/UFOs/blob/66eb9e513850ec44a265f28c1f8bae5d148850d0/UFOs-Challenge/static/images/Challenge-all_filters.png)
  
- By clearing the criteria, users can access the whole database again.

![No filters](https://github.com/saramcel/UFOs/blob/66eb9e513850ec44a265f28c1f8bae5d148850d0/UFOs-Challenge/static/images/Challenge-no_filters.png)

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

To summarize, there is one key drawback of this data filtering design, and two recommended developments that could improve user experience in the future. 

- Main drawback of this approach to filtering UFO sighting data:
  - The user input must match exactly--this means if there is any variation at all, the matches will not be returned. For example, the current filters are case-sensitive, and they will not find common format variations of date (e.g. "01/01/2010" returns nothing, while "1/1/2010" returns data). 

- Recommendation 1:
  - Reduce user error in input filters by adding drop-down menus and a clickable date entry field. 
  - After quick web search, it appears that the drop-down menus can be accomplished with code from [W3 Schools](https://www.w3schools.com/howto/howto_js_dropdown.asp).
  - Here is an example of how to create a clickable calendar in javascript from [That software dude, part 1](https://www.thatsoftwaredude.com/content/6396/coding-a-calendar-in-javascript), and [part 2](https://www.thatsoftwaredude.com/content/8914/coding-a-calendar-in-javascript-part-2).
 

- Recommendation 2:
  - Add a sorting function so that the user can have more control over what the output looks like. 
  - Sorting the geographical and shape components alphabetically can be accomplished with the following code from [W3 Schools](https://www.w3schools.com/howto/howto_js_sort_table.asp).
  - Sorting by date is a little more complicated, but if we adjust how the date is formatted in the data, the following code might work from [Stack abuse](https://stackabuse.com/how-to-sort-an-array-by-date-in-javascript/). 
