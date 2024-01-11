# Heat.js - Map Range:

Below is the format that is expected for a map range object when calling "setConfiguration()".
<br>
<br>


| Type: | Name: | Description: |
| --- | --- | --- |
| *number* | minimum | The minimum count the date has reached before showing this CSS class. |
| *string* | cssClassName | The CSS class name to apply to the day when the minimum value is met. |

<br>


## Example:

```markdown
<script> 
  $heat.setConfiguration( {
      mapRangeColors: [
        {
            minimum: 10,
            cssClassName: "day-color-1"
        },
        {
            minimum: 15,
            cssClassName: "day-color-2"
        },
        {
            minimum: 20,
            cssClassName: "day-color-3"
        },
        {
            minimum: 25,
            cssClassName: "day-color-4"
        }
      ]
  } );
</script>
```