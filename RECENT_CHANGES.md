## Version 5.0.0:

#### **New Features:**
- Added a new "Yearly Statistics" view (shown under the title bar), which shows some basic stats for the current year (off by default).
- Added a brand new view called "Months", which shows a bar graph with the total items (per trend) per month (with color range toggle support).
- Added a brand new view called "Line", which shows a single heat line for the entire year (with color range toggle support).
- Added a brand new Export dialog, which is shown (when pressing the Export button) instead of using the default export binding option value.
- Added a brand new Import dialog, which is shown (when pressing the Import button) instead of the select files dialog.
- Added a brand new Add Type dialog, which allows new trend types to be added manually (off by default).
- More Export and Import options.
- Added translation support for Vietnamese (vi).
- Added zooming support to the Map and Line views (off by default).
- All title bar buttons are now rendered using pure CSS! No more settings, with complete universal device support.
- Tooltips for the "Map" and "Chart" views now show the counts (can be turned off).
- The "Days" (and "Months") view now takes the Color Range toggles into account when displaying the values.
- Added animation effects for all Bar Graph views.
- Invert color range toggles support via the guide (off by default).
- The "Map" view now behaves like all other views (it can be disabled, and shows no data messages by default).

#### **Exporting:**
- Added support to export all data to YAML (.yaml).
- Added support to export all data to TOML (.toml).

#### **Importing:**
- Added support to import data from a Markdown file (.md).
- Added support to import data from a YAML file (.yaml).
- Added support to import data from a TOML file (.toml).

#### **Themes:**
- Added a new theme called "heat.js.light.theme.css", which uses the default day colors against a lighter theme.

#### **Binding Options - Breaking Changes:**
- BREAKING: The binding option "tooltip.dayText" has been removed.
- BREAKING: The binding option "views.map.showNoDataMessageWhenDataIsNotAvailable" has been removed.
- BREAKING: Renamed "views.days.useDifferentBackgroundOpacities" to "views.days.useDifferentOpacities" (and now defaults to true).
- BREAKING: Renamed "views.map.showDayNumbers" to "views.map.showDayCounts".
- BREAKING: Renamed "views.chart.showLineNumbers" to "views.chart.showLineCounts".
- BREAKING: Renamed "views.days.showDayNumbers" to "views.days.showDayCounts".
- BREAKING: Renamed "views.statistics.showRangeNumbers" to "views.statistics.showRangeCounts".

#### **Binding Options - New / Updates:**
- Added a new binding option called "allowMultipleFileImports", which states if multiple file imports are enabled (defaults to true).
- Added a new binding option called "percentageDecimalPoints", which states the number of decimal points to show for percentages (defaults to 2).
- Added a new binding option called "allowTypeAdding", which states if trend types can be added manually (defaults to false).
- Added a new binding option called "chartsAnimationDelay", which states the milliseconds to wait before applying a grow animation to each chart line (for all views, defaults to 50. Set to zero to turn off).
- Added a new binding option called "exportDateTimeFormat", which states the format of the export date/time that is included in some of the formats (defaults to "{dddd}, {d}{o} {mmmm} {yyyy}").
- Added a new binding option called "title.showTitleDropDownMenu", which states if the title drop-down menu should be shown (defaults to true).
- Added a new binding option called "title.showClearButton", which states if the "Clear" button should be shown (defaults to false).
- Added a new binding option called "guide.showInvertLabel", which states if the "Invert" label should be shown (inverts the toggle selections, defaults to false).
- Added a new binding option called "views.map.dayToolTipText", which states the tooltip format to use for a day (defaults to "{dddd}, {d}{o} {mmmm} {yyyy}").
- Added a new binding option called "views.chart.dayToolTipText", which states the tooltip format to use for a chart day (defaults to "{dddd}, {d}{o} {mmmm} {yyyy}").
- Added a new binding option called "views.map.highlightCurrentDay", which states if the current day should be highlighted (defaults to false).
- Added a new binding option called "views.chart.highlightCurrentDay", which states if the current day should be highlighted (defaults to false).
- Added a new binding option called "views.map.showYearsInMonthNames", which states if the year should be shown in the month name (when "startMonth" is set, defaults to true).
- Added a new binding option called "views.chart.showYearsInMonthNames", which states if the year should be shown in the month name (when "startMonth" is set, defaults to true).
- Added a new binding option called "views.map.showCountsInToolTips", which states if the day counts should be included in the tooltips (defaults to true).
- Added a new binding option called "views.chart.showCountsInToolTips", which states if the day counts should be included in the tooltips (defaults to true).
- Added a new binding option called "views.days.showDayCountPercentages", which states if the count percentages should be shown (when count displays are enabled, defaults to true).
- Added a new binding option called "views.statistics.showRangeCountPercentages", which states if the count percentages should be shown (when count displays are enabled, defaults to true).
- Added a new binding option called "views.map.enabled", which states if the map view is enabled (defaults to true).
- Added a new binding option called "views.statistics.showRangeNamesInToolTips", which states if the range names should be shown in the tooltips (if available, defaults to true).
- Added a new binding option called "views.chart.addMonthSpacing", which states if spacing and a divider line should be added between each month (defaults to false).
- The "view.map" binding options "showDayDateNumbers" and "showDayCounts" can now be used at the same time.
- The "view.chart" binding options "showLineDateNumbers" and "showLineCounts" can now be used at the same time.

#### **Binding Options - New Areas:**
- Added a new binding area called "views.month" (this contains the same properties as "views.days", with some minor name differences).
- Added a new binding area called "views.line" (this contains similar properties as "views.chart", with some minor name differences, and some that are not needed).
- Added a new binding area called "yearlyStatistics".
- Added a new binding option called "yearlyStatistics.enabled", which states if the yearly statistics should be shown (defaults to false).
- Added a new binding option called "yearlyStatistics.showToday", which states if the "Today" box should be shown in the yearly statistics (defaults to true).
- Added a new binding option called "yearlyStatistics.showThisWeek", which states if the "This Week" box should be shown in the yearly statistics (defaults to true).
- Added a new binding option called "yearlyStatistics.showThisMonth", which states if the "This Month" box should be shown in the yearly statistics (defaults to true).
- Added a new binding option called "yearlyStatistics.showThisYear", which states if the "This Year" box should be shown in the yearly statistics (defaults to true).
- Added a new binding option called "yearlyStatistics.showOnlyForCurrentYear", which states if the yearly statistics should only be shown for the current year (defaults to false).
- Added a new binding option called "yearlyStatistics.showPercentages", which states if the yearly statistics should show the value percentages (defaults to true).
- Added a new binding area called "zooming".
- Added a new binding option called "zooming.enabled", which states if map zooming in/out is enabled (defaults to false).
- Added a new binding option called "zooming.defaultLevel", which states the default zoom level (defaults to 0).
- Added a new binding option called "zooming.maximumLevel", which states the maximum zoom level (defaults to 0, which disables it).

#### **Binding Options - Custom Triggers - Breaking:**
- BREAKING: Renamed "events.onDayClick" to "events.onMapDayClick".
- BREAKING: Renamed "events.onDayDblClick" to "events.onMapDayDblClick".
- BREAKING: Renamed "events.onDayToolTipRender" to "events.onMapDayToolTipRender".

#### **Binding Options - Custom Triggers - New / Updates:**
- Added a new binding custom trigger called "events.onLineDayToolTipRender", which states an event that should be called for custom rendering the tooltip for a specific line day (defaults to "events.onMapDayToolTipRender").
- Added a new binding custom trigger called "events.onChartDayToolTipRender", which states an event that should be called for custom rendering the tooltip for a specific chart day (defaults to "events.onMapDayToolTipRender").
- Added a new binding custom trigger called "events.onMonthClick", which triggers when a month is clicked.
- Added a new binding custom trigger called "events.onMonthDblClick", which triggers when a month is double-clicked.
- Added a new binding custom trigger called "events.onLineDayClick", which triggers when a day in the "Line" view is clicked (defaults to "events.onMapDayClick").
- Added a new binding custom trigger called "events.onLineDayDblClick", which triggers when a day in the "Line" view is double-clicked (defaults to "events.onMapDayDblClick").
- Added a new binding custom trigger called "events.onChartDayClick", which triggers when a day in the "Chart" view is clicked (defaults to "events.onMapDayClick").
- Added a new binding custom trigger called "events.onChartDayDblClick", which triggers when a day in the "Chart" view is double-clicked (defaults to "events.onMapDayDblClick").
- Added a new binding custom trigger called "events.onZoomLevelChange", which triggers when the zoom level in the "Map" view is changed.
- Added a new "isHoliday" parameter for the events "events.onMapDayToolTipRender", "events.onChartDayToolTipRender", and "events.onLineDayToolTipRender", which is now passed after the "count" parameter.

#### **Configuration Options - Breaking Changes:**
- BREAKING: Remove all symbol-based text configuration options.
- BREAKING: Renamed "text.closeToolTipText" to "text.closeButtonText".
- BREAKING: Renamed "text.configurationToolTipText" to "text.configurationButtonText".

#### **Configuration Options:**
- Added a new configuration text option called "text.todayText" (defaults to "Today").
- Added a new configuration text option called "text.thisWeekText" (defaults to "This Week").
- Added a new configuration text option called "text.thisMonthText" (defaults to "This Month").
- Added a new configuration text option called "text.thisYearText" (defaults to "This Year").
- Added a new configuration text option called "text.unavailableText" (defaults to "Unavailable").
- Added a new configuration text option called "text.monthsText" (defaults to "Months").
- Added a new configuration text option called "text.noMonthsDataMessage" (defaults to "There are currently no months to view.").
- Added a new configuration text option called "text.selectTypeText" (defaults to "Select Type").
- Added a new configuration text option called "text.filenamePlaceholderText" (defaults to "Filename (optional)").
- Added a new configuration text option called "text.onlyDataBeingViewedText" (defaults to "Only data being viewed").
- Added a new configuration text option called "text.zoomInText" (defaults to "Zoom In").
- Added a new configuration text option called "text.zoomOutText" (defaults to "Zoom Out").
- Added a new configuration text option called "text.clearButtonText" (defaults to "Clear").
- Added a new configuration text option called "text.selectFilesText" (defaults to "Select File(s)").
- Added a new configuration text option called "text.dragAndDropFilesText" (defaults to "Drag and drop your file(s) here ...").
- Added a new configuration text option called "text.addTypeText" (defaults to "Add Type").
- Added a new configuration text option called "text.typePlaceholderText" (defaults to "Type").
- Added a new configuration text option called "text.addButtonText" (defaults to "Add").
- Added a new configuration text option called "text.removeButtonText" (defaults to "Remove").
- Added a new configuration text option called "text.invertText" (defaults to "Invert").
- Added a new configuration text option called "text.lineText" (defaults to "Line").
- Added a new configuration text option called "text.noLineDataMessage" (defaults to "There are currently no data to view.").

#### **Public Functions:**
- Added a new public function called "getActiveView()", which returns the active view name for a specific element ID instance.
- Added a new public function called "addType()", which adds a new trend type.

#### **Security:**
- All eval() references have been removed from the code base. When using a binding, if you are using custom events, you will need to pass the bindings via a function.

#### **General:**
- All numbers shown in the display (and tooltips) are now formatted into a user-friendly display (1000 becomes 1,000).
- Slightly increased the right padding of the titles drop-down menu.
- The height of the main "heat-js" layout now more or less stays the same when switching views.
- Added “:active” CSS styles for all view click areas.
- Double-clicking the Month/Day names in the Map and Chart views will now jump you to the Months/Days view (if enabled).
- The title bar drop-down menu now uses an arrow for the active view (instead of the default circle).
- Added a small top and bottom margin to the Type buttons in the footer, which will ensure that types on multiple lines are displayed nicely.
- The binding options "useDifferentOpacities" now have hex color support, and will now use the same opacity on the borders.
- Improved the drop-down menus in the light themes to make them stand out.
- The guides' day toggles now use separate CSS variables for their spacing and size.
- The view-specific binding option "useDifferentOpacities" now uses the lowest to highest opacities for the lowest to highest values.
- The disabled background is now darker, as it was causing some color issues.
- Improved the public API so that all expected types are used.
- When the title bar headers are shown, the category sections are now slightly indented to make them a bit easier to see.
- Each month shown in the Map view now has a new attribute called "data-heat-js-month-number", which stores the month number.
- Views/Dialogs are now only rendered when they are active (helps performance when many views/dialogs are enabled).
- The display is no longer re-rendered when the configuration dialog is closed, and nothing has changed.
- Export text files now contain a header that states when the content was last modified.
- Only one instance of the "heat-js-tooltip" tooltip element is now created.

#### **Library:**
- Updated all the NPM packages to the latest versions.
- All "data-" attributes assigned to elements in the views are now defined in the "constant.ts" file.
- Improved the organization and comments of the SCSS / CSS files.
- Split up ExportType, and added a new ImportType type (which is now used to set up the import types automatically).
- Removed the "const" keyword from all enums in the "enum.ts" file.
- The "Configuration" type has been renamed to "ConfigurationOptions".
- All sort() usages are now correctly defined, and now use lambdas.

#### **Fixes:**
- Fixed a fault that caused some of the export dates to have missing parts of the dates.
- Fixed a fault that caused no data to show for some views when the binding option "startMonth" is set.
- Fixed the events "onMapDayDblClick" (renamed from "onDayDblClick"), "onWeekDayDblClick", and "onStatisticDblClick" not being set against the right event handler.
- Fixed a fault that caused the public API function "export()" to use the wrong file extension when using a type other than the default.
- Fixed a fault that caused the public API function "export()" to use the wrong mime type when exporting to a format other than the default.
- Fixed a fault that would cause the tooltips to remain visible when switching to another window / tab.
- Fixed a fault that would cause the chart view to show a very small area when using larger numbers.
- Fixed a fault that caused some of the color ranges not to appear in the "Statistics" view when only larger numbers are used.
- Fixed various spelling mistakes throughout the code.
- Fixed a fault that allowed invalid numbers to be used for the binding option "startMonth", which caused some weird display issues.
- Fixed a fault that caused the disabled background to appear over the rounded border corners.
- Fixed a description alignment fault when it's shown in the guide footer (instead of above it).
- Fixed a fault that caused buttons that are disabled to use a text color that cannot be seen (mostly in light themes).
- Fixed all the buttons that did not have the "type" attribute.
- Fixed the days shown in light themes (that have no color assigned) using a darker color, making counts hard to see.
- Fixed a fault that would cause the "Statistics" view to show the wrong largest value when no day ranges have been matched.
- Fixed a fault that would cause the content of the title bar buttons to be misaligned when switching between device sizes.
- Fixed a fault that caused the years-dropdown menu to use an inconsistent height across different devices.
- Fixed a fault that caused the imported data not to be saved into local storage (when enabled).
- Fixed a fault that caused the tend types (shown in the guide) to be shown in the wrong order (they are now alphabetically sorted).
- Fixed a fault that caused the days in the "Map" view to align incorrectly (for the last day column in a month) when the binding option "views.maps.showDaysInReverseOrder" is enabled.
- Fixed a fault that prevented some of the click events and active/hover CSS classes from being used for the days in the "Map" view when the binding option "views.maps.showMonthDayGaps" is disabled.
- Fixed a fault that caused the gaps to not be removed in the "Map" view when the binding option "views.map.showMonthsInReverseOrder" is enabled and the binding option "views.maps.showMonthDayGaps" is disabled.
- Fixed a fault that caused the "Days" and "Statistics" views to sometimes show the wrong values.
- Fixed a fault that would cause the bar graph lines (in all views) to sometimes be misaligned.
- Fixed a fault that would cause the bar graph lines to overlap their top containers by 0.5px.
- Fixed a fault that caused the guide toggle buttons to appear with different widths when numbers are enabled.
- Fixed a fault that would cause the main browser's scroll position to jump to the top when switching views or years.
- Fixed a fault that caused the tooltips to remain visible when the Map / Chart views are scrolled.
- Fixed a fault that caused the month names in the "Chart" view to be misaligned when the binding option "views!.chart!.showInReverseOrder" is enabled.
- Fixed the title bar buttons jumping around slightly when switching between years.
- Fixed a fault that caused the wrong mouse cursor to be disabled when hovering over the Configuration button in the title bar (mainly in Safari).
- Fixed a fault that caused the current view to refresh when calling the public API function "switchView()" with the view that is active.
- Fixed a fault that caused the "Export" button to appear in the title bar when no data is available (even when the binding option "title.showExportButton" is enabled).
- Fixed a fault that would cause the data stored in local storage to be loaded for any Heat.js instance (no matter the element ID).