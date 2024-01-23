# Heat.js - Functions:

Below is a list of all the public functions that can be called from the Heat.js instance.
<br>
<br>



## Manage Dates:

### **addDate( *elementId*, *date*, *[triggerRefresh]* )**:
Adds a date for a specific element ID, and refreshes the UI (if specified). If the date already exists, its value is increased by one.
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should show the new date.
<br>
***Parameter: date***: '*Date*' - The date to add.
<br>
***Parameter: [type]***: '*string*' - The trend type (defaults to "None").
<br>
***Parameter: [triggerRefresh]***: '*boolean*' - States if the UI for the element ID should be refreshed (defaults to true).
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **removeDate( *elementId*, *date*, *[triggerRefresh]* )**:
Removes a date for a specific element ID, and refreshes the UI (if specified). If the date already exists, its value is decreased by one.
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should show the updated date.
<br>
***Parameter: date***: '*Date*' - The date to remove.
<br>
***Parameter: [type]***: '*string*' - The trend type (defaults to "None").
<br>
***Parameter: [triggerRefresh]***: '*boolean*' - States if the UI for the element ID should be refreshed (defaults to true).
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **reset( *elementId*, *[triggerRefresh]* )**:
Removes all the dates for a specific element ID, and refreshes the UI (if specified).
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should be updated.
<br>
***Parameter: [triggerRefresh]***: '*boolean*' - States if the UI for the element ID should be refreshed (defaults to true).
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>
<br>


## Manage Instances:

### **refresh( *elementId* )**:
Refreshes a Heat.js instance.
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should be refreshed.
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **refreshAll()**:
Refreshes all of the rendered Heat.js instances.
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **setYear( *elementId*, *year* )**:
Sets the year to be displayed.
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should be updated.
<br>
***Parameter: year***: '*number*' - The year that should be shown.
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
Renders a new map on a element using the options specified.
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
<br>


## Destroying:

### **destroy( *elementId* )**:
Reverts an element back to its original state (without render attributes).
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID to destroy.
<br>
***Returns***: '*Object*' - The Heat.js class instance.

### **destroyAll()**:
Reverts all rendered elements back to their original state (without render attributes).
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>
<br>


## Configuration:

### **setConfiguration( *newOptions* )**:
Sets the specific configuration options that should be used.
<br>
***Parameter: newOptions***: '*Object*' - All the configuration options that should be set (refer to ["Configuration Options"](configuration/OPTIONS.md) documentation for properties).
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>
<br>


## Additional Data:

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