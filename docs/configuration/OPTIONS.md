# Heat.js - Configuration - Options:

Below are all the configuration options that can be passed to the "setConfiguration()" public function.


### Options:

| Type: | Name: | Description: |
| --- | --- | --- |
| *boolean* | safeMode | States if safe-mode is enabled (errors will be ignored and logged only, defaults to true). |
| *Object* | domElementTypes | The DOM element types to lookup (can be either an array of strings, or a space-separated string, and defaults to "*"). |
| *Object[]* | mapRangeColors | The heap-map ranges that should be used for specific colors (first default is [ { minimum: 10, cssClassName: 'day-color-1' } ]). |

<br/>


### Options - Strings:

| Type: | Name: | Description: |
| --- | --- | --- |
| *string* | stText | The day ordinal text for "st". |
| *string* | ndText | The day ordinal text for "nd". |
| *string* | rdText | The day ordinal text for "rd". |
| *string* | thText | The day ordinal text for "th". |
| *string* | backButtonText | The text that should be shown for the "Back" button. |
| *string* | nextButtonText | The text that should be shown for the "Next" button. |
| *string* | refreshButtonText | The text that should be shown for the "Refresh" button. |
| *string* | lessText | The text that should be shown for the "Less" label. |
| *string* | moreText | The text that should be shown for the "More" label. |
| *string[]* | monthNames | The month names (defaults to '[ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]'). |
| *string[]* | dayNames | The day names (defaults to '[ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ]'). |

<br/>


## Example:

```markdown
<script> 
  $heat.setConfiguration( {
      safeMode: false
  } );
</script>
```