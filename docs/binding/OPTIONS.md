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
| *boolean* | showMonthDayGaps | States if the gaps between the days in each month should be shown (defaults to true). |
| *boolean* | showRefreshButton | States if the "Refresh" button should be shown (defaults to false). |
| *number[]* | daysToShow | States the days that should be shown (defaults to [1, 2, 3, 4, 5, 6, 7]). |
| *Object[]* | mapRangeColors | The heap-map ranges that should be used for specific colors (first default is [ { minimum: 10, cssClassName: 'day-color-1' } ]). |
| *boolean* | showMonthNames | States if the month names are shown (defaults to true). |
| *boolean* | showExportButton | States if the "Export" button should be shown (defaults to false). |
| *boolean* | mapTogglesEnabled | States if the heat map toggles are enabled (defaults to true). |
| *boolean* | placeMonthNamesOnTheBottom | States if the month names should be placed at the bottom (defaults to false). |
| *boolean* | exportOnlyYearBeingViewed | States if only the data for the year being viewed should be exported (defaults to true). |
| *number* | year | States the year that should be shown when the heat map is rendered for the first time (defaults to the current year). |
| *boolean* | showDayNumbers | States if the activity counts should be shown in the days (defaults to false). |

<br/>


## String Options:

| Type: | Name: | Description: |
| --- | --- | --- |
| *string* | titleText | The text that should be shown for the main title (defaults to "Heat.js"). |
| *string* | dayToolTipText | The tooltip text that should be shown for a day (defaults to "{d}{o} {mmmm} {yyyy}"). Refer to ["Date Formatting"](/docs/DATE_FORMATS.md) documentation for options. |

<br/>


## Binding Example:

```markdown
<div data-heat-options="{ 'showDayNames': true }">
    Your HTML.
</div>
```