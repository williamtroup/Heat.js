# Heat.js - Change Log:

## Version 2.1.2:
- Minor README.md fix.
- Fixed a fault that prevented the "onExport" custom trigger from firing when the public function "export()" is called.
- 

<br>


## Version 2.1.1:
- Fixed errors in the "PUBLIC_FUNCTIONS.md" documentation.
- Updated "README.md" and "README_NUGET.md" documentation.
- Fixed the years drop-down list triggering the custom trigger "onNextYear" instead of "onSetYear".
- Fixed a fault that caused the class of the main container to be constantly reset whenever the view/data changes.
- Fixes to spacing used in the documentation.

<br>


## Version 2.1.0:

#### **New Features:**
- Added file-dropping support to all views, which allows exported JSON data to be re-imported to the currently selected trend type.

#### **Binding Options:**
- BREAKING: Renamed the binding option "noTypesLabel" to "descriptionText", and updated documentation.
- BREAKING: Renamed the binding option "noTypesLabelLink" to "descriptionTextLink", and updated documentation.
- Added a new binding option called "allowFileImports", which states if file importing via drag & drop is enabled (defaults to true).

#### **Binding Options - Custom Triggers:**
- Added a new binding option custom trigger called "onImport", which states an event that should be triggered when data is imported.

#### **Public Functions:**
- The public function "setConfiguration()" now has an additional parameter called "triggerRefresh" (defaults to true), which will force refresh all rendered maps.

#### **UI Changes:**
- The "descriptionText" binding option text is now shown no matter if trend types are used (if they are used, the description text is shown above the buttons).

#### **Fixes:**
- Fixed the "box-sizing" rules not being applied to the main container (causing width issues in mobile mode).
- Fixed the "box-sizing" rules not being applied to the tooltip (causing width issues in mobile mode).
- Fixed a fault that caused all pre-configured settings to be wiped out when calling "setConfiguration()".

<br>


## Version 2.0.0:

#### **New Features:**
- BREAKING: All binding options that affect the views and how they look are now split up into categories under a new "views" area.
- Added support to disable the "Chart" and "Statistics" views.
- Added local storage persistent support! This will allow data added/removed between browser usages to be remembered.
- Added support to show different colors in the "Map", "Chart" and "Statistics" views (see documentation).
- Added support for 5 new languages!
- Added 6 new themes!

### **Breakdown**:

#### **Binding Options:**
- BREAKING: Renamed the binding option "mapRangeColors" to "colorRanges" (more consistent with the project), and updated documentation.
- Added a new binding option called "views.statistics.showColorRangeLabels", which states if the chart X color range labels should be shown (defaults to true).
- Added a new binding option called "views.chart.enabled", which states if the "Chart" view is enabled (defaults to true).
- Added a new binding option called "views.statistics.enabled", which states if the "Statistics" view is enabled (defaults to true).
- Added a new binding option called "useLocalStorageForData", which states if data added/removed should be remembered in local storage (defaults to true).
- Added a new binding option called "views.map.showDaysInReverseOrder", which states if the days of the week should be in reverse order (defaults to false).

#### **Binding Options - Color Ranges:**
- Added a new "colorRanges" binding option called "mapCssClassName", which states a CSS class name to use for items in the "Map" view (overrides the "cssClassName" property).
- Added a new "colorRanges" binding option called "chartCssClassName", which states a CSS class name to use for items in the "Chart" view (overrides the "cssClassName" property).
- Added a new "colorRanges" binding option called "statisticsCssClassName", which states a CSS class name to use for items in the "Statistics" view (overrides the "cssClassName" property).

#### **Binding Options - Custom Triggers:**
- BREAKING: Renamed the binding option custom trigger "onMapRangeTypeToggle" to "onColorRangeTypeToggle" (more consistent with the project), and updated documentation.

#### **Configuration Options:**
- Added a new configuration option called "unknownTrendText", which states the text that should be shown for the "Unknown" trend type button (was originally "None").

#### **Translations:**
- Added translation support for Afrikaans (af).
- Added translation support for Armenian (hy).
- Added translation support for Belarusian (be).
- Added translation support for Catalan (ca).
- Added translation support for Esperanto (eo).

#### **Themes:**
- The default theme now uses a different shade of green for the days, to move the project away from the GitHub style.
- Added new theme "dist/dark/heat.js.dark.github.theme.css", which shows a dark theme, but with green day colors (the original scheme that looks like GitHub).
- Added new theme "dist/dark/heat.js.dark.bright-yellow.theme.css", which shows a dark theme, but with day colors set to use the color bright yellow.
- Added new theme "dist/light/heat.js.light.shamrock-green.theme.css", which shows a light theme, but with day colors set to use the color shamrock green.
- Added new theme "dist/light/heat.js.light.gamboge.theme.css", which shows a light theme, but with day colors set to use the color gamboge.
- Renamed the theme "dist/light/heat.js.light.orange.theme.css" to "heat.js.light.bright-orange.theme.css".
- Renamed the theme "dist/light/heat.js.light.blue.theme.css" to "heat.js.light.neon-blue.theme.css" (with color improvements).
- Renamed the theme "dist/dark/heat.js.dark.blue.theme.css" to "heat.js.dark.bright-blue.theme.css" (with color improvements).
- Renamed the theme "dist/dark/heat.js.dark.orange.theme.css" to "heat.js.dark.bright-orange.theme.css" (with color improvements).
- Added new theme "dist/dark/heat.js.dark.bright-purple.theme.css", which shows a dark theme, but with day colors set to use the color bright purple.
- Added new theme "dist/light/heat.js.light.bright-purple.theme.css", which shows a light theme, but with day colors set to use the color bright purple.
- Renamed the theme "dist/dark/heat.js.dark.red.theme.css" to "heat.js.dark.cadmium-red.theme.css" (with color improvements).

#### **CSS:**
- Changed the default value for "--heat-js-border-radius-day" to 0.35rem.
- Added ":root" variable "--heat-js-day-chart-width", which specifies the width of the bar lines shown in the "Chart" view.
- Improved the spacing used for the month names in the "Chart" view (they align more with the bars now).
- Improved the width of the control when additional libraries are not used.

#### **Fixes:**
- Fixed a fault that caused the years drop-down arrow to still appear when the binding option "showYearSelectionDropDown" is set to false.
- Fixed a grammar mistake in the configuration option "noStatisticsDataMessage".
- Fixed the configuration option "noStatisticsDataMessage" being missing from all translation files.
- Fixed the default trend type text "None" being missing from all translation files (now configuration, and renamed to "Unknown").
- Fixed the public functions "addDates()" and "removeDates()" trigger an extra custom trigger (onAdd and onRemove).
- Fixed some naming mistakes in the markup/code documentation.

<br>


## Version 1.9.2:
- Updated the README documentation.
- Added a "visible" property to the binding option configuration "mapRangeColors", which will allow you to set the visible ranges on load.
- Added a new binding option custom trigger called "onMapRangeTypeToggle", which states an event that should be triggered when a map range's visible state is toggled on/off.
- Added a new binding option called "noTypesLabelLink", which states a link that should be used for the "noTypesLabel" label (defaults to null).

<br>


## Version 1.9.1:
- The Chart/Statistics views now hide the margin-left of the first bar when displayed in mobile view.
- The years drop-down list now scrolls to the active year when first opened (or after the year is changed).
- Fixed some spelling mistakes in the main "src" JS file.
- Added install instructions into the main README files.
- Added Chinese (simplified) translation improvements (thank you @ziqiangai).

<br>


## Version 1.9.0:

#### **New Features:**
- Export to XML support!

#### **Binding Options:**
- Updated the binding option "tooltipDelay" to have a default value of 750, instead of 1000.

#### **View: Statistics:**
- The bars shown in the view now show a tooltip, which shows the total count for each range type.

#### **Public Functions:**
- Added a new public function "switchView()", which will switch the current view for any rendered element.
- Added a new public function "switchType()", which will switch the selected trend type for any rendered element.

#### **General Improvements:**
- The drop-down menus for the title bar/years list now fade in when shown.
- The tooltips shown throughout the display now fade in when shown.
- Added Math injection directly into the main instance.
- Added JSON injection directly into the main instance.
- Added Chinese (simplified) translation improvements.
- Updated the project description.
- The entire display now uses the same font, either when an extra library is installed or not.

#### **CSS:**
- Added a new ":root" variable called "--heat-js-default-font".
- Added a new ":root" variable called "--heat-js-animation-length".
- Added a new ":root" variable called "--heat-js-color-snow-white".
- Added a new ":root" variable called "--heat-js-years-text-color-hover".
- Added a new ":root" variable called "--heat-js-title-text-color-hover".
- Added a new ":root" variable called "--heat-js-button-text-color-hover".
- Added a new ":root" variable called "--heat-js-button-text-color-active".
- Added a new ":root" variable called "--heat-js-text-bold-weight-active".

#### **Fixes:**
- Fixed the year's list having extra padding around the left, right, and bottom, which caused the menu to stay open longer when the mouse left the menu.
- Fixed the "Chart" view lines being positioned using "margin-left" instead of just "left".
- Fixed some errors in the documentation and added data that was missing.
- Fixed a fault that caused exporting data in JSON to ignore the binding option "exportOnlyYearBeingViewed".
- Fixed a fault that caused the "Map" view to render the days in the wrong places when the binding option "daysToShow" is configured to show fewer days.
- Fixed a fault that caused the "Statistics" view to show data for Days/Months that are hidden via the binding options configuration.
- Fixed a fault that caused the month names in the "Chart" view to be shown in the wrong position when months are hidden via the binding options configuration.
- Fixed an extra loop occurring overall data when exporting.
- Fixed the "heat.js.nuspec" file including the ".github" folder when NuGet PACK is called.

<br>


## Version 1.8.3:
- The default text color shown in the default dark theme is now slighter darker.
- Minor code organisation improvements.
- The month names shown in the Map view now use an ellipsis when larger text is shown (for translations).

<br>


## Version 1.8.2:
- Added translation support for Hebrew (he).
- Added translation support for Indonesian (id).
- Added translation support for Estonian (et).
- Added translation support for Icelandic (is).
- Added translation support for Nepali (ne).
- Added translation support for Thai (th).
- Added translation support for Slovenian (sl).
- Added translation support for Farsi (fa).
- Added translation support for Slovak (sk).
- Added translation support for Luxembourgish (lb).
- Added translation support for Irish (ga).
- Added translation support for Galician (gl).
- Added translation support for Malay (ms).

<br>


## Version 1.8.1:
- Fixed some mistakes in the documentation (GitHub only).
- The statistics view now shows the bars fully using the available width, which will ensure they show up correctly in mobile view.
- Added translation support for Danish (da).
- Added translation support for Ukrainian (uk).
- Added translation support for Dutch (nl).
- Added translation support for Finnish (fi).
- Added translation support for Greek (el).
- Added translation support for Georgian (ka).
- Added translation support for Korean (ko).
- Added translation support for Hungarian (hu).
- Added translation support for Italian (it).
- Added translation support for Latvian (lv).
- Added translation support for Lithuanian (lt).
- Added translation support for Norwegian (no).
- Added translation support for Romanian (ro).
- Added translation support for Swedish (sv).
- Added translation support for Bulgarian (bg).

<br>


## Version 1.8.0:

#### **New Features:**
- Added a new "Statistics" view, which shows the total count per map range type (in a bar chart).
- Added label support for the bottom right, which allows you to add a description (when no trend types are used).

#### **Binding Options:**
- Added a new binding option called "noTypesLabel", which states a label that should be shown when no trend types are available (defaults to null).

#### **Configuration Options:**
- Added a new configuration option called "statisticsText", which states the text that should be shown for the "Statistics" label (defaults to "Statistics").
- Added a new configuration option called "noStatisticsDataMessage", which states the message that should be shown on the chart view when there is no data (defaults to "There is currently no statistics to view.").

#### **Public Functions:**
- Added new public function "getIds()", which will return all the IDs for the elements that have been rendered.
- Added new public function "resetAll()", which will reset the data for all elements.
- Added new public function "moveToPreviousYear()", which will move the year back one.
- Added new public function "moveToNextYear()", which will set move the year forward one.
- Added new public function "moveToCurrentYear()", which will move the year to the current year.

#### **General Improvements:**
- When the no data messages are shown, all other objects in the DOM element are now removed.

#### **Documentation:**
- Lots of improvements to the documentation.

#### **Fixes:**
- Fixed a fault that caused the Y-axis labels in the chart view to overlap the chart when a larger number is shown.
- Fixed a fault that caused the sorting order for the map range types to be ignored when custom ones were used.
- Fixed a fault that caused empty data sets to be exported to CSV files.
- Fixed a fault that caused the active state for buttons to be shown when the button is disabled.

<br>


## Version 1.7.1:
- Fixed documentation errors.
- Added a new configuration option called "noChartDataMessage", which states the message that should be shown on the chart view when there is no data (defaults to "There is currently no data to view.").
- Fixed the year's drop-down list not appearing correctly in the chart view when data is available.
- Fixed the height of the control changing slightly when no data is available and the view is switched.

<br>


## Version 1.7.0:

#### **New Features:**
- Export to JSON support!

#### **Binding Options:**
- Added a new binding option called "exportType", which states what format the data should be exported as (defaults to "csv", also accepts "json").

#### **Binding Options - Custom Triggers:**
- Added a new binding option called "onViewSwitch", which states an event that should be triggered when the view is switched.

#### **Public Functions:**
- Added new public function "export()", which will export all the data for a specific element ID.

#### **Themes:**
- The theme files are now organised into "dark" and "light" folders.
- Added new theme "dist/dark/heat.js.dark.red.theme.css", which shows a dark theme, but with red day colors.
- Added new theme "dist/dark/heat.js.dark.blue.theme.css", which shows a dark theme, but with blue day colors.
- Added new theme "dist/dark/heat.js.dark.orange.theme.css", which shows a dark theme, but with orange day colors.
- Added new theme "dist/light/heat.js.light.blue.theme.css", which shows a light theme, but with blue day colors.
- Added new theme "dist/light/heat.js.light.orange.theme.css", which shows a light theme, but with orange day colors.
- Renamed the theme "heat.js.light.theme.css" to "dist/light/heat.js.light.red.theme.css".

#### **CSS:**
- Added a new ":root" variable called "--heat-js-title-opener-text-color-hover", which states the text hover color that should be used for the drop-down menu openers.

<br>


## Version 1.6.4:
- Fixed a fault that caused the "onNextYear" custom trigger to fire when the view is switched.

<br>


## Version 1.6.3:
- Increased the bars width shown in the chart view to 10 pixels.
- Added a top left/right border radius to bars width shown in the chart view. 

<br>


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