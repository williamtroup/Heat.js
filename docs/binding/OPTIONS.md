# Heat.js - Binding Options:

Below is a list of all the options supported in the "data-heat-options" binding attribute for DOM elements.
<br>
<br>


## Standard Options:

| Type: | Name: | Description: |
| --- | --- | --- |
| *boolean* | showDayNames | States if the day names are shown (defaults to true). |
| *boolean* | showGuide | States if the heat map guide is shown (defaults to true). |
| *boolean* | showTitle | States if the title is shown (defaults to true). |
| *boolean* | showYearSelector | States if the year selector (and buttons) is shown (defaults to true). |
| *number[]* | monthsToShow | States the months that should be shown (defaults to [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]). |

<br/>


## String Options:

| Type: | Name: | Description: |
| --- | --- | --- |
| *string* | titleText | The text that should be shown for the main title (defaults to "Heat.js"). |

<br/>


## Binding Example:

```markdown
<div data-heat-options="{ 'showDayNames': true }">
    Your HTML.
</div>
```