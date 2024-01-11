# Heat.js - Change Log:

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
- Fixed a major fault that prevented the heat map showing the other CSS classes for days correctly.

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