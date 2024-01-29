# Heat.js - Change Log:

## Version 1.6.2:
- Added hover effect for the guide day toggles that are turned off.
- Fixed package keywords and description being wrong.

<br>


## Version 1.6.1:
- Fixed a fault that prevented the tooltips from showing when click events are not assigned, or the map toggles are turned off.
- Removed more duplicate code.
- Removed a manual setter for the position of the day names in the map view (when the month names are at the bottom).

<br>


## Version 1.6.0:

#### **New Features:**
- Added custom tooltip support! Tooltips will continue to show as normal, but you can now style when using the new ":root" variables.

#### **Binding Options:**
- Added a new binding option called "tooltipDelay", which states how long the tooltip should wait (in milliseconds) until it's shown (defaults to 1000).

#### **Public Functions:**
- Added new public function "addDates()", which will add an array of dates (saves all addDate() each time).
- Added new public function "removeDates()", which will remove an array of dates (saves all removeDate() each time).

#### **CSS:**
- Added an extra bit of spacing before the first bar in the chart view.

<br>


## Version 1.5.2:
- Removed a manual margin setter when the month names are shown at the bottom of the map view.
- In the Chart view, if a day does not have a valid value, the default background/border color (as shown on the Map view) is now shown.

<br>


## Version 1.5.1:
- Fixed an error in the binding option custom triggers documentation.
- Fixed the chart view showing the border at the bottom of each bar.
- Fixed the binding option "showMonthNames" not being used for the chart view.
- Added extra values for the Y axis on the chart view (now shows five values in total).
- Removed dead code that is no longer needed.
- Fixed the overflow CSS properties for the chart and map being the wrong type.
- Added a new binding option called "showChartYLabels", which states if the chart Y axis labels should be shown (defaults to true).
- Added arrows to the title and year text in the title bar (to help show that a drop-down menu is available for each).

<br>


## Version 1.5.0:

#### **New Features:**
- Added chart support! This view can be shown using a new menu available from the title bar!

#### **Binding Options:**
- Added a new binding option called "view", which states the view that should be shown by default (defaults to "map", also accepts "chart").

#### **Binding Options - Custom Triggers:**
- Added a new binding option called "onAdd", which states an event that should be called when new dates are added.
- Added a new binding option called "onRemove", which states an event that should be called when dates are removed.
- Added a new binding option called "onReset", which states an event that should be called when all data for an element is reset.

#### **Configuration Options:**
- Added a new configuration option called "mapText", which states the text that should be shown for the "Map" label (defaults to "Map").
- Added a new configuration option called "chartText", which states the text that should be shown for the "Chart" label (defaults to "Chart").

#### **CSS:**
- Decreased the height of the year's drop-down list slightly.
- Added snap to scroll support for the year's drop-down list.

#### **General Improvements:**
- All rendering areas are now sectioned in the JS code.
- The year currently selected in the view is now shown in the year drop-down list.

<br>


## Version 1.4.0:

#### **New Features:**
- The year text (shown between the back/next buttons) now shows a drop-down list of years that can be selected.

#### **Binding Options:**
- Added a new binding option called "keepScrollPositions", which states if the scroll positions should be maintained when the map is redrawn (or moving year to year, defaults to false).
- Added a new binding option called "extraSelectionYears", which states the extra years that should be included in the year drop-down list (defaults to 50).
- Added a new binding option called "showYearSelectionDropDown", which states if the year selection drop-down menu is shown (defaults to true).

#### **Public Functions:**
- Added new public function "render()", which will render a heat map on a specific DOM element using the options you specify.
- Added new public function "setYearToHighest()", which will set the year being displayed for a heat map DOM element to the highest available.
- Added new public function "setYearToLowest()", which will set the year being displayed for a heat map DOM element to the lowest available.

#### **CSS:**
- Added a new ":root" variable "--heat-js-text-bold-weight", which states the font weight to use for all text (now 400).
- Added a new ":root" variable "--heat-js-title-bold-weight", which states the font weight to use for the title text, and the year (set to 800).

#### **General Improvements:**
- Removed the possibility that a binding option can override access to the element.

#### **Documentation:**
- Improved the documentation to show which public functions fire custom triggers (and which ones).

<br>


## Version 1.3.0:

#### **Binding Options:**
- Added a new binding option called "showDayNumbers", which states if the activity counts should be shown in the days (defaults to false).

#### **Binding Options - Custom Triggers:**
- Added a new binding option called "onDayToolTipRender", which states an event that should be called for custom rendering the tooltip for a specific day.

#### **Public Functions:**
- Added new public function "renderAll()", which will find all new DOM elements with the "data-heat-options" attribute and render them.

#### **CSS:**
- Added new ":root" variable "--heat-js-day-color-1-text-color".
- Added new ":root" variable "--heat-js-day-color-2-text-color".
- Added new ":root" variable "--heat-js-day-color-3-text-color".
- Added new ":root" variable "--heat-js-day-color-4-text-color".
- Added an ":active" state for days (now shows a slightly different opacity).

#### **Fixes:**
- Fixed a fault that allowed the hover/active CSS states to still be shown when no event is assigned to the days.

<br>


## Version 1.2.1:
- Fixed a minor fault that caused the month names to be centred.
- Fixed the day name labels shown on the right, so are now the same height/margin as the days, allowing them to align correctly.
- Added new ":root" variable "--heat-js-border-size-day", which states the size to use the days/day name heights.
- Fixed the day name labels not being aligned to the middle vertically.
- Increased the default size of the days from 0.85rem to 1.1rem.
- The day names are now hidden in mobile view.
- The type/guide toggles are now stacked in mobile view and centred (make them much easier to access and see).
- The export/refresh buttons are now hidden in mobile view.
- Added new ":root" variable "--heat-js-button-text-color", which will allow you to override the button text colors.
- The light mode theme buttons now use a darker background color (so they stand out).
- Added the button margin back in for the test files.
- Documentation improvements.

<br>


## Version 1.2.0:

#### **Themes:**
- Added a new folder under "dist" called "themes", which will house all the default theme files.
- Added a new light theme called "heat.js.light.theme.css".

#### **Binding Options:**
- Added a new binding option called "year", which states the year that should be shown when the heat map is rendered for the first time (defaults to current year).

#### **CSS:**
- Increased the margin under the title bar.
- Decreased the margin used around the "type" buttons shown in the guide.
- Removed the "margin-right" CSS property for the last days in the last month.
- Added an ":active" state for all buttons (now shows a slightly lighter background color).
- Removed replicated HEX colors (all now reference the original ":root" variable).
- Added an ":active" state for less/more toggles (now shows a slightly darker text color).
- Added new ":root" variable "--heat-js-day-opacity-hover", which states the opacity to use for days when they are hovered.
- All hover transition effects now work for hovering, and not hovering, which results in a smoother display.
- Added new ":root" variable "--heat-js-day-color-1-background-color".
- Added new ":root" variable "--heat-js-day-color-2-background-color".
- Added new ":root" variable "--heat-js-day-color-3-background-color".
- Added new ":root" variable "--heat-js-day-color-4-background-color".
- Added new ":root" variable "--heat-js-day-color-1-border-color".
- Added new ":root" variable "--heat-js-day-color-2-border-color".
- Added new ":root" variable "--heat-js-day-color-3-border-color".
- Added new ":root" variable "--heat-js-day-color-4-border-color".

#### **General Improvements:**
- Removed a large amount of duplicated code.

#### **Fixes:**
- Fixed a fault that prevented decimal values for CSS margins from being converted correctly.
- Fixed broken documentation links.

<br>


## Version 1.1.0:

#### **Translations:**
- Added a new folder under "dist" called "translations", which will house all the translations files for languages supported.
- Added support for the following languages:
  1. Arabic
  2. Bengali
  3. Chinese (simplified)
  4. English
  5. French
  6. German
  7. Hindi
  8. Japanese
  9. Polish
  10. Portuguese
  11. Spanish
  12. Turkish

<br>


## Version 1.0.0:

#### **Binding Options:**
- Added a new binding option called "exportOnlyYearBeingViewed", which states that only the data for the year being viewed should be exported (defaults to true).

#### **Binding Options - Custom Triggers:**
- An on click event is now only assigned to the days when the binding custom trigger "onDayClick" is set.

#### **CSS:**
- Split up the SCSS file into sections.

#### **Fixes:**
- Fixed a fault that caused the trend type buttons to be hidden when the binding option "showGuide" is set to false.
- Fixed a fault that caused "undefined" to be passed to the "count" parameter for the binding custom trigger "onDayClick".
- Fixed HTML files using the wrong formatting for meta, and imports being missing.

#### **Documentation:**
- Improved documentation in the main README files.

<br>


## Version 0.9.0:

#### **Binding Options:**
- Added a new binding option called "placeMonthNamesOnTheBottom", which states if the month names should be placed at the bottom (defaults to false).

#### **Binding Options - Custom Triggers:**
- Added a new binding option called "onTypeSwitch", which states an event that should be triggered when the trend type being viewed is switched.

#### **General Improvements:**
- When the binding option "showMonthDayGaps" is set to true, gaps are now always shown between the months (even if the first day is a Monday).

#### **CSS:**
- The buttons will no longer show a focused outline effect when Bootstrap is being used.
- Added new ":root" variable "--heat-js-day-border-color", which states the border color to use for the days.
- Added new ":root" variable "--heat-js-day-spacing", which states the spacing to use for the days (now all even).
- Improved the spacing around the main buttons.

<br>


## Version 0.8.0:

#### **Binding Options:**
- Added a new binding option called "mapTogglesEnabled", which states if the map toggles are enabled (defaults to true).

#### **Binding Options - Custom Triggers:**
- Added a new binding option called "onSetYear", which states an event that should be triggered when the year is manually set.

#### **Public Functions:**
- Added new public function "setYear()", which will set the year being displayed for a heat map DOM element.
- Added new public function "getYear()", which will return the year being displayed.

#### **General Improvements:**
- The heat map layout is now fully responsive with mobile and tablet views.
- When exporting the map details, the type selected is now included in the filename (if types are available).

<br>


## Version 0.7.0:
- BREAKING: All ":root" variables now start with "--heat-js-", which will prevent collisions with other libraries.
- Updated project homepage URL.

<br>


## Version 0.6.1:
- Fixed documentation in the README files.

<br>


## Version 0.6.0:

#### **New Features:**
- Trend types support! This allows you to add data for various trend types, which can then be toggled in the guide under the map!

#### **General Improvements:**
- The "More" and "Less" labels can now be clicked, which will toggle all map range colors on/off.

#### **CSS:**
- Renamed the "year" CSS class to "title-bar".

#### **Fixes:**
- Fixed the entire heatmap rendering slightly incorrectly when bootstrap is not available.

<br>


## Version 0.5.1:

#### **Fixes:**
- Fixed a fault that allowed date counts to go into negative values (when calling "removeDate()").
- Minor code improvement for future work plans.

<br>


## Version 0.5.0:

#### **New Features:**
- The heat map can now export all data to a CSV file (off by default).

#### **Binding Options:**
- Added a new binding option called "showMonthNames", which states if the month names should be shown (defaults to true).
- Added a new binding option called "showExportButton", which states if the "Export" button should be shown (defaults to false).

#### **Binding Options - Custom Triggers:**
- The binding option "onDayClick" now has two parameters: Date, Count.
- Added a new binding option called "onExport", which states an event that should be triggered when heatmap data is exported.

#### **Configuration Options:**
- Added a new configuration option called "exportButtonText", which states the text that should be shown for the "Export" button (defaults to "Export").
- Added a new configuration option called "dateText", which states the text that should be shown for the "Date" CSV header (defaults to "Date").
- Added a new configuration option called "countText", which states the text that should be shown for the "Count" CSV header (defaults to "Count").

#### **CSS:**
- Added some spacing between the "Back" button and the "Refresh" and "Export" buttons.

#### **General:**
- Updated the project description.

<br>


## Version 0.4.0:

#### **New Features:**
- The heat map colors that are displayed can now be toggled on/off by clicking the associated color in the guide.

#### **Binding Options - Custom Triggers:**
- Added a new binding option called "onDestroy", which states an event that should be triggered when a heatmap is destroyed.
- Added a new binding option called "mapRangeColors", which works as it did before, but can now be set per heatmap.
- Added "id" support for "mapRangeColors", which states a unique identifier to use for the color item (optional).
- Added "tooltipText" support for "mapRangeColors", which states the tooltip text to use for the color item in the guide (optional).

#### **Configuration Options:**
- Removed the configuration option called "mapRangeColors".

#### **Public Functions:**
- Added new public function "destroy()", which will revert a heatmap DOM element to its original state.
- Added new public function "destroyAll()", which will revert all heatmap DOM elements to their original state.

#### **CSS:**
- Added a new ":root" variable called "--border-size-day", which states the border size for the days shown in the heatmap (now slightly thicker).
- Added hover effects to the day CSS classes "div.day-color-*".

<br>


## Version 0.3.0:

#### **Binding Options:**
- Added a new binding option called "showMonthDayGaps", which states if the gaps between the days in each month should be shown (defaults to true).
- Added a new binding option called "showRefreshButton", which states if the "Refresh" button should be shown (defaults to false).
- Added a new binding option called "daysToShow", which states the days that should be shown (defaults to [1, 2, 3, 4, 5, 6, 7]).

#### **Configuration Options:**
- Added a new configuration option called "refreshButtonText", which states the text that should be shown for the "Refresh" button (defaults to "Refresh").

#### **CSS:**
- Added slightly darker borders around the default day CSS classes "div.day-color-*".

#### **Fixes:**
- Fixed the binding option "monthsToShow" not being read when set.
- Fixed the CSS classes "div.day-color-*" being in the opacity order.
- Fixed a major fault that prevented the heat map from showing the other CSS classes for days correctly.

<br>


## Version 0.2.0:

#### **Binding Options:**
- Added a new binding option called "dayToolTipText", which states the tooltip text that should be shown for a day.

#### **Binding Options - Custom Triggers:**
- Added a new binding option called "onRefresh", which states an event that should be triggered when a heatmap is refreshed.
- Added a new binding option called "onBeforeRender", which states an event that should be triggered before an element is rendered.
- Added a new binding option called "onRenderComplete", which states an event that should be triggered after an element is rendered.

#### **Public Functions:**
- Added new public function "removeDate()", which will remove a specific date from a heat map (or decrease the date if more than one exists).
- Added new public function "reset()", which will remove all the dates from a heat map.

#### **Documentation:**
- Improved documentation in the main README files.
- Fixed some spelling/grammar mistakes.

<br>


## Version 0.1.0:
- Everything :)