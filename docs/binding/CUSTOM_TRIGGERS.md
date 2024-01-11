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

<br>


## For Year Selections:

### options.onBackYear( *year* ):
Fires when the year is moved back one.
<br>
***Parameter:*** year: '*number*' - The year that is now being viewed.

### options.onNextYear( *year* ):
Fires when the year is moved forward one.
<br>
***Parameter:*** year: '*number*' - The year that is now being viewed.
<br>
<br>


## For Day Clicking:

### options.onDayClick( *date* ):
Fires when a day is clicked in the heat map.
<br>
***Parameter:*** date: '*Date*' - The date that was clicked.
<br>
<br>


## Binding Example:

```markdown
<div data-heat-options="{ 'onDayClick': yourJsFunction }">
    Your HTML.
</div>
```