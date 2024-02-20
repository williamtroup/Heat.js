# Heat.js - Functions:

Below is a list of all the public functions that can be called from the Heat.js instance.
<br>
<br>


## Manage Dates:

### **addDates( *elementId*, *dates*, *[triggerRefresh]* )**:
Adds an array of dates for a specific element ID, and refreshes the UI (if specified). If the dates already exist, their values are increased by one.
<br>
***Fires***:  onAdd
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should show the new date.
<br>
***Parameter: dates***: '*Date[]*' - The dates to add.
<br>
***Parameter: [type]***: '*string*' - The trend type (defaults to "Unknown").
<br>
***Parameter: [triggerRefresh]***: '*boolean*' - States if the UI for the element ID should be refreshed (defaults to true).
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **addDate( *elementId*, *date*, *[triggerRefresh]* )**:
Adds a date for a specific element ID, and refreshes the UI (if specified). If the date already exists, its value is increased by one.
<br>
***Fires***:  onAdd
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should show the new date.
<br>
***Parameter: date***: '*Date*' - The date to add.
<br>
***Parameter: [type]***: '*string*' - The trend type (defaults to "Unknown").
<br>
***Parameter: [triggerRefresh]***: '*boolean*' - States if the UI for the element ID should be refreshed (defaults to true).
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **removeDates( *elementId*, *dates*, *[triggerRefresh]* )**:
Removes an array of dates for a specific element ID, and refreshes the UI (if specified). If the dates already exist, their values are decreased by one.
<br>
***Fires***:  onRemove
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should show the updated date.
<br>
***Parameter: dates***: '*Date[]*' - The dates to remove.
<br>
***Parameter: [type]***: '*string*' - The trend type (defaults to "Unknown").
<br>
***Parameter: [triggerRefresh]***: '*boolean*' - States if the UI for the element ID should be refreshed (defaults to true).
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **removeDate( *elementId*, *date*, *[triggerRefresh]* )**:
Removes a date for a specific element ID, and refreshes the UI (if specified). If the date already exists, its value is decreased by one.
<br>
***Fires***:  onRemove
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should show the updated date.
<br>
***Parameter: date***: '*Date*' - The date to remove.
<br>
***Parameter: [type]***: '*string*' - The trend type (defaults to "Unknown").
<br>
***Parameter: [triggerRefresh]***: '*boolean*' - States if the UI for the element ID should be refreshed (defaults to true).
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **clearDate( *elementId*, *date*, *[triggerRefresh]* )**:
Clears a date for a specific element ID, and refreshes the UI (if specified).
<br>
***Fires***:  onClear
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should show the updated date.
<br>
***Parameter: date***: '*Date*' - The date to clear.
<br>
***Parameter: [type]***: '*string*' - The trend type (defaults to "Unknown").
<br>
***Parameter: [triggerRefresh]***: '*boolean*' - States if the UI for the element ID should be refreshed (defaults to true).
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **resetAll( *[triggerRefresh]* )**:
Removes all the dates for all the elements, and refreshes the UI (if specified).
<br>
***Fires***:  onReset
<br>
***Parameter: [triggerRefresh]***: '*boolean*' - States if the UI for each element should be refreshed (defaults to true).
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **reset( *elementId*, *[triggerRefresh]* )**:
Removes all the dates for a specific element ID, and refreshes the UI (if specified).
<br>
***Fires***:  onReset
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should be updated.
<br>
***Parameter: [triggerRefresh]***: '*boolean*' - States if the UI for the element ID should be refreshed (defaults to true).
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **export( *elementId* )**:
Exports all the data for a specific element ID.
<br>
***Fires***:  onExport
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID whose data should be exported.
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>
<br>


## Manage Instances:

### **refresh( *elementId* )**:
Refreshes a Heat.js instance.
<br>
***Fires***:  onRefresh
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should be refreshed.
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **refreshAll()**:
Refreshes all of the rendered Heat.js instances.
<br>
***Fires***:  onRefresh
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **setYear( *elementId*, *year* )**:
Sets the year to be displayed.
<br>
***Fires***:  onSetYear
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should be updated.
<br>
***Parameter: year***: '*number*' - The year that should be shown.
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **setYearToHighest( *elementId* )**:
Sets the year to the highest year available.
<br>
***Fires***:  onSetYear
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should be updated.
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **setYearToLowest( *elementId* )**:
Sets the year to the lowest year available.
<br>
***Fires***:  onSetYear
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should be updated.
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **moveToPreviousYear( *elementId* )**:
Moves the year back one.
<br>
***Fires***:  onBackYear
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should be updated.
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **moveToNextYear( *elementId* )**:
Moves the year forward one.
<br>
***Fires***:  onNextYear
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should be updated.
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **moveToCurrentYear( *elementId* )**:
Moves to the current year.
<br>
***Fires***:  onSetYear
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should be updated.
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **getYear( *elementId* )**:
Gets the year currently being displayed.
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID.
<br>
***Returns***: '*Object*' - The year being displayed (or null).
<br>

### **render( *element*, *options* )**:
Renders a new map on an element using the options specified.
<br>
***Parameter: element***: '*Object*' - The element to convert to a heat map.
<br>
***Parameter: options***: '*Object*' - The options to use (refer to "Binding Options" documentation for properties).
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **renderAll()**:
Finds all new map elements and renders them.
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **switchView( *elementId*, *viewName* )**:
Switches the view on an element to either Map, Chart, or Statistics.
<br>
***Fires***:  onViewSwitch
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID.
<br>
***Parameter: viewName***: '*string*' - The name of the view to switch to (either "map", "chart", or "statistics").
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **switchType( *elementId*, *type* )**:
Switches the selected trend type on an element.
<br>
***Fires***:  onTypeSwitch
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID.
<br>
***Parameter: type***: '*string*' - The name of the type to switch to.
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **updateOptions( *elementId*, *newOptions* )**:
Updates the original binding options for an element and refreshes it.
<br>
***Fires***:  onRefresh
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID.
<br>
***Parameter: newOptions***: '*Object*' - The new options to want to apply to the element.
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>
<br>


## Destroying:

### **destroy( *elementId* )**:
Reverts an element to its original state (without render attributes).
<br>
***Fires***:  onDestroy
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID to destroy.
<br>
***Returns***: '*Object*' - The Heat.js class instance.

### **destroyAll()**:
Reverts all rendered elements to their original state (without render attributes).
<br>
***Fires***:  onDestroy
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>
<br>


## Configuration:

### **setConfiguration( *newConfiguration*, *[triggerRefresh]* )**:
Sets the specific configuration options that should be used.
<br>
***Fires***:  onRefresh
<br>
***Parameter: newConfiguration***: '*Object*' - All the configuration options that should be set (refer to ["Configuration Options"](configuration/OPTIONS.md) documentation for properties).
<br>
***Parameter: [triggerRefresh]***: '*boolean*' - States if the UI for each element should be refreshed (defaults to true).
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>
<br>


## Additional Data:

### **getIds()**:
Returns an array of element IDs that have been rendered.
<br>
***Returns***: '*string[]*' - The element IDs that have been rendered.
<br>

### **getVersion()**:
Returns the version of Heat.js.
<br>
***Returns***: '*string*' - The version number.
<br>
<br>


## Example:

```markdown
<script> 
    var version = $heat.getVersion();
</script>
```