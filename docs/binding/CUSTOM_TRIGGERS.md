# Heat.js - Binding Options - Custom Triggers:

Below is a list of all the custom triggers supported in the "data-heat-options" binding attribute for DOM elements.
<br>
<br>


## For Rendering:

### options.onRefresh( *element* ):
Fires when a rendered heat map is refreshed.
<br>
***Parameter:*** element: '*Object*' - The element that was refreshed.
<br>

### options.onBeforeRender( *element* ):
Fires before the rendering of an element.
<br>
***Parameter:*** element: '*object*' - The DOM element that is going to be rendered.

### options.onRenderComplete( *element* ):
Fires when the rendering of an element is complete.
<br>
***Parameter:*** element: '*object*' - The DOM element that was rendered.

### options.onDestroy( *element* ):
Fires when the element is destroyed (reverted to its original state).
<br>
***Parameter:*** element: '*object*' - The DOM element that was destroyed.

### options.onDayToolTipRender( *date*, *count* ):
Fires when a tooltip for a specific day is rendered.
<br>
***Parameter:*** date: '*Date*' - The date of the day.
<br>
***Parameter:*** count: '*number*' - The number of activities for the day.
<br>
***Returns***: '*string*' - The text that you want to use in the tooltip.

<br>


## For Year Selections:

### options.onBackYear( *year* ):
Fires when the year is moved back.
<br>
***Parameter:*** year: '*number*' - The year that is now being viewed.

### options.onNextYear( *year* ):
Fires when the year is moved forward.
<br>
***Parameter:*** year: '*number*' - The year that is now being viewed.
<br>

### options.onSetYear( *year* ):
Fires when the year is manually set.
<br>
***Parameter:*** year: '*number*' - The year that is now being viewed.
<br>
<br>


## For Day Clicking:

### options.onDayClick( *date*, *count* ):
Fires when a day is clicked in the "map" or "chart" views.
<br>
***Parameter:*** date: '*Date*' - The date that was clicked.
<br>
***Parameter:*** count: '*number*' - The number of items for the date available.
<br>

### options.onStatisticClick( *colorRange* ):
Fires when a statistic is clicked in the "statistics" view.
<br>
***Parameter:*** colorRange: '*Object*' - The statistic color range details.
<br>
<br>


## For Data:

### options.onAdd( *element* ):
Fires when data for an element is added.
<br>
***Parameter:*** element: '*Object*' - The element that the data was added for.
<br>

### options.onRemove( *element* ):
Fires when data for an element is removed.
<br>
***Parameter:*** element: '*Object*' - The element that the data was removed from.
<br>

### options.onReset( *element* ):
Fires when data for an element is reset.
<br>
***Parameter:*** element: '*Object*' - The element that the data was reset for.
<br>

### options.onExport( *element* ):
Fires when the data for an element is exported.
<br>
***Parameter:*** element: '*Object*' - The element that the data was exported for.
<br>

### options.onImport( *element* ):
Fires when data for an element is imported.
<br>
***Parameter:*** element: '*Object*' - The element that the data was imported for.
<br>

### options.onDataFetch( *element* ):
Fires when an element requests a data pull (will return all the data in an object).
<br>
***Parameter:*** element: '*Object*' - The element that the data is being fetched for.
<br>
***Returns:*** '*Object*' - An object of data.
<br>
<br>


## For Views:

### options.onTypeSwitch( *type* ):
Fires when the trend type being viewed is switched.
<br>
***Parameter:*** type: '*string*' - The trend type selected.
<br>

### options.onViewSwitch( *view* ):
Fires when the view is switched.
<br>
***Parameter:*** view: '*string*' - The view selected.
<br>

### options.onColorRangeTypeToggle( *id*, *visible* ):
Fires when a color range type is toggled on/off
<br>
***Parameter:*** id: '*string*' - The ID of the color range.
<br>
***Parameter:*** visible: '*boolean*' - States if the color range is visible.
<br>
<br>


## Binding Example:

```markdown
<div data-heat-options="{ 'onDayClick': yourJsFunction }">
    Your HTML.
</div>
```