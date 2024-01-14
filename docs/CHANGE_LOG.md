# Heat.js - Change Log:

## Version 0.6.0:

#### **New Features:**
- Trend types support! This allows you to add data for various trend types, which can then be toggled in the guide under the map!

#### **General Improvements:**
- The "More" and "Less" labels can now be clicked, which will toggle all map ranges colors on/off.

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