# Heat.js - Configuration - Options:

Below are all the configuration options that can be passed to the "setConfiguration()" public function.


### Options:

| Type: | Name: | Description: |
| --- | --- | --- |
| *boolean* | safeMode | States if safe-mode is enabled (errors will be ignored and logged only, defaults to true). |

<br/>


## Example:

```markdown
<script> 
  $heat.setConfiguration( {
      safeMode: false
  } );
</script>
```