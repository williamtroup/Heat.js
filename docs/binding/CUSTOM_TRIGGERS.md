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
Fires when the element is destroyed (reverted back to its original state).
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
Fires when a day is clicked in the heat map.
<br>
***Parameter:*** date: '*Date*' - The date that was clicked.
<br>
***Parameter:*** count: '*number*' - The number of items for the date available.
<br>
<br>


## For Data:

### options.onAdd( *element* ):
Fires when data for a heatmap is added.
<br>
***Parameter:*** element: '*Object*' - The element that the data was added for.
<br>

### options.onRemove( *element* ):
Fires when data for a heatmap is removed.
<br>
***Parameter:*** element: '*Object*' - The element that the data was removed from.
<br>

### options.oReset( *element* ):
Fires when data for a heatmap is reset.
<br>
***Parameter:*** element: '*Object*' - The element that the data was reset for.
<br>

### options.onExport( *element* ):
Fires when the data for a heatmap is exported.
<br>
***Parameter:*** element: '*Object*' - The element that the data was exported for.
<br>
<br>


## For Types:

### options.onTypeSwitch( *type* ):
Fires when the trend type being viewed is switched.
<br>
***Parameter:*** type: '*string*' - The trend type selected.
<br>
<br>


## Binding Example:

```markdown
<div data-heat-options="{ 'onDayClick': yourJsFunction }">
    Your HTML.
</div>
```