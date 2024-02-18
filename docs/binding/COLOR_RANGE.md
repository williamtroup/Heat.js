# Heat.js - Binding Options - Color Ranges:

Below is a list of all the options supported for the property "colorRanges" used in the "data-heat-options" binding attribute for DOM elements.
<br>
<br>


| Type: | Name: | Description: |
| --- | --- | --- |
| *number* | minimum | The minimum count the date has reached before showing this item's CSS class. |
| *string* | cssClassName | The default CSS class name to apply to an item when the minimum value is met. |
| *string* | mapCssClassName | The override CSS class name to apply to the item in the "Map" view when the minimum value is met (optional). |
| *string* | chartCssClassName | The override CSS class name to apply to the item in the "Chart" view when the minimum value is met (optional). |
| *string* | statisticsCssClassName | The override CSS class name to apply to the item in the "Statistics" view when the minimum value is met (optional). |
| *string* | tooltipText | The tooltip text that should be shown for the item in the guide. |
| *string* | id | The unique identifier for this item. |
| *boolean* | visible | States if the item should be shown in the views (defaults to true). |

<br>


## Example:

```markdown
<div data-heat-options="{ 'colorRanges': [ { 'minimum': 10, 'cssClassName': 'day-color-1' }, { 'minimum': 15, 'cssClassName': 'day-color-2' }, { 'minimum': 20, 'cssClassName': 'day-color-3' }, { 'minimum': 25, 'cssClassName': 'day-color-4' } ] }">
    Your HTML.
</div>
```

