# Heat.js - Configuration - Options:

Below are all the configuration options that can be passed to the "setConfiguration()" public function.


### Options:

| Type: | Name: | Description: |
| --- | --- | --- |
| *boolean* | safeMode | States if safe-mode is enabled (errors will be ignored and logged only, defaults to true). |
| *Object* | domElementTypes | The DOM element types to lookup (can be either an array of strings, or a space-separated string, and defaults to "*"). |

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
| *string* | exportButtonText | The text that should be shown for the "Export" button. |
| *string* | lessText | The text that should be shown for the "Less" label. |
| *string* | moreText | The text that should be shown for the "More" label. |
| *string[]* | monthNames | The month names (defaults to '[ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]'). |
| *string[]* | dayNames | The day names (defaults to '[ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ]'). |
| *string* | dateText | The text that should be shown for the "Date" CSV header. |
| *string* | countText | The text that should be shown for the "Count" CSV header. |
| *string* | mapText | The text that should be shown for the "Map" label. |
| *string* | chartText | The text that should be shown for the "Chart" label. |
| *string* | noChartDataMessage | States the message that should be shown on the chart view when there is no data (defaults to "There is currently no data to view."). |

<br/>


## Example:

```markdown
<script> 
  $heat.setConfiguration( {
      safeMode: false
  } );
</script>
```