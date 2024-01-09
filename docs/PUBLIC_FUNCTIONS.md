# Heat.js - Functions:

Below is a list of all the public functions that can be called from the Heat.js instance.
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