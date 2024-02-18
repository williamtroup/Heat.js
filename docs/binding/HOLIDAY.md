# Heat.js - Binding Options - Holidays:

Below is a list of all the options supported for the property "holidays" used in the "data-heat-options" binding attribute for DOM elements.
<br>
<br>


| Type: | Name: | Description: |
| --- | --- | --- |
| *string* | date | States the date of the holiday (format is "DD/MM/YYYY". If you don't include the year, the holiday will be shown every year). |
| *string* | name | States the name of of the holiday. |
| *boolean* | showInViews | States if the holiday is shown in the views (defaults to true). If true, the date will be excluded from all views. |

<br/>


## Binding Example:

```markdown
<div data-heat-options="{ 'holidays': [ { 'date': '25/12', 'name': 'Christmas Day', 'showInViews': true } ] }">
    Your HTML.
</div>
```