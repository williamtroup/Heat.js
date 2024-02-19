# Heat.js - Binding Options:

Below is a list of all the options supported in the "data-heat-options" binding attribute for DOM elements.
<br>
<br>


## Standard Options:

| Type: | Name: | Description: |
| --- | --- | --- |
| *boolean* | showGuide | States if the heat map guide is shown (defaults to true). |
| *boolean* | showTitle | States if the title is shown (defaults to true). |
| *boolean* | showYearSelector | States if the year selector (and buttons) is shown (defaults to true). |
| *boolean* | showRefreshButton | States if the "Refresh" button should be shown (defaults to false). |
| *Object[]* | colorRanges | The colors that should be used for specific ranges (first default is [ { minimum: 10, cssClassName: 'day-color-1' } ]. Refer to ["Color Range"](COLOR_RANGE.md) documentation for properties). |
| *boolean* | showExportButton | States if the "Export" button should be shown (defaults to false). |
| *boolean* | mapTogglesEnabled | States if the heat map toggles are enabled (defaults to true). |
| *boolean* | exportOnlyYearBeingViewed | States if only the data for the year being viewed should be exported (defaults to true). |
| *number* | year | States the year that should be shown when the heat map is rendered for the first time (defaults to the current year). |
| *boolean* | keepScrollPositions | States if the scroll positions should be maintained when the map is redrawn (or moving year to year, defaults to false). |
| *number* | extraSelectionYears | States the extra years that should be included in the year drop-down list (defaults to 50). |
| *boolean* | showYearSelectionDropDown | States if the year selection drop-down menu is shown (defaults to true). |
| *boolean* | view | States the view that should be shown by default (defaults to "map", also accepts "chart" and "statistics"). |
| *number* | tooltipDelay | States how long the tooltip should wait (in milliseconds) until it's shown (defaults to 750). |
| *string* | exportType | States the export file type that should be used (defaults to "csv", also accepts "json", "xml", and "txt"). |
| *string* | descriptionText | States a description that should be shown below the active view (defaults to null). |
| *string* | descriptionTextLink | States a link that should be used for the "descriptionText" label (defaults to null). |
| *boolean* | useLocalStorageForData | States if data added/removed should be remembered in local storage (remembered between browser usages, defaults to false). |
| *boolean* | allowFileImports | States if file importing via drag & drop is enabled (defaults to true). |
| *number[]* | yearsToHide | States the years that should be hidden (defaults to []). |
| *boolean* | showLessAndMoreLabels | States if the "Less" and "More" labels are shown (defaults to true). |
| *boolean* | showNumbersInGuide | States if the color range numbers should be shown in the guide (defaults to false). |
| *boolean* | showImportButton | States if the "Import" button should be shown (defaults to false). |
| *Object[]* | holidays | States the holidays that should be shown in the views (defaults to [], refer to ["Holidays"](HOLIDAY.md) documentation for properties). |
| *number* | dataFetchDelay | States how long the data fetching should wait (in milliseconds) until its next pull (defaults to 60000). |

<br/>


## View Options: Map:

| Category: | Type: | Name: | Description: |
| --- | --- | --- | --- |
| views.map | *boolean* | showMonthDayGaps | States if the gaps between the days in each month should be shown (defaults to true). |
| views.map | *boolean* | showDayNames | States if the day names are shown (defaults to true). |
| views.map | *boolean* | placeMonthNamesOnTheBottom | States if the month names should be placed at the bottom (defaults to false). |
| views.map | *boolean* | showDayNumbers | States if the activity counts should be shown in the days (defaults to false). |
| views.map | *boolean* | showMonthNames | States if the month names are shown (defaults to true). |
| views.map | *number[]* | monthsToShow | States the months that should be shown (defaults to [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]). |
| views.map | *number[]* | daysToShow | States the days that should be shown (defaults to [1, 2, 3, 4, 5, 6, 7]). |
| views.map | *boolean* | showDaysInReverseOrder | States if the days of the week should be in reverse order (defaults to false). |

<br/>


## View Options: Chart:

| Category: | Type: | Name: | Description: |
| --- | --- | --- | --- |
| views.chart | *boolean* | enabled | States if this view is enabled (defaults to true). |
| views.chart | *boolean* | showChartYLabels | States if the chart Y axis labels should be shown (defaults to true). |
| views.chart | *boolean* | showMonthNames | States if the month names are shown (defaults to true). |
| views.chart | *number[]* | monthsToShow | States the months that should be shown (defaults to [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]). |
| views.chart | *number[]* | daysToShow | States the days that should be shown (defaults to [1, 2, 3, 4, 5, 6, 7]). |
| views.chart | *boolean* | showLineNumbers | States if the activity counts should be shown in the lines (defaults to false). |

<br/>


## View Options: Statistics:

| Category: | Type: | Name: | Description: |
| --- | --- | --- | --- |
| views.statistics | *boolean* | enabled | States if this view is enabled (defaults to true). |
| views.statistics | *boolean* | showChartYLabels | States if the chart Y axis labels should be shown (defaults to true). |
| views.statistics | *boolean* | showColorRangeLabels | States if the chart X color range labels should be shown (defaults to true). |
| views.statistics | *number[]* | monthsToShow | States the months that should be shown (defaults to [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]). |
| views.statistics | *number[]* | daysToShow | States the days that should be shown (defaults to [1, 2, 3, 4, 5, 6, 7]). |
| views.statistics | *boolean* | useColorRangeNamesForLabels | States if the color range names should be shown instead of the minimum for the X labels (defaults to false). |

<br/>


## String Options:

| Type: | Name: | Description: |
| --- | --- | --- |
| *string* | titleText | The text that should be shown for the main title (defaults to "Heat.js"). |
| *string* | dayToolTipText | The tooltip text that should be shown for a day (defaults to "{d}{o} {mmmm} {yyyy}"). Refer to ["Date Formatting"](/docs/DATE_FORMATS.md) documentation for options. |

<br/>


## Binding Example:

```markdown
<div data-heat-options="{ 'views': { 'map': { 'showDayNames': true } } }">
    Your HTML.
</div>
```