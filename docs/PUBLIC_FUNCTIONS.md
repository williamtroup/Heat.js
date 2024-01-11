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
***Parameter: [triggerRefresh]***: '*boolean*' - States if the UI for the element ID should be refresh (defaults to true).
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
***Parameter: [triggerRefresh]***: '*boolean*' - States if the UI for the element ID should be refresh (defaults to true).
<br>
***Returns***: '*Object*' - The Heat.js class instance.
<br>

### **reset( *elementId*, *[triggerRefresh]* )**:
Removes all the dates for a specific element ID, and refreshes the UI (if specified).
<br>
***Parameter: elementId***: '*string*' - The Heat.js element ID that should be updated.
<br>
***Parameter: [triggerRefresh]***: '*boolean*' - States if the UI for the element ID should be refresh (defaults to true).
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
<br>


## Configuration:

### **setConfiguration( *newOptions* )**:
Sets the specific configuration options that should be used.
<br>
***Parameter: newOptions***: '*Options*' - All the configuration options that should be set (refer to ["Configuration Options"](configuration/OPTIONS.md) documentation for properties).
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