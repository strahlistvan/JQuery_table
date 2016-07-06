# JQuery Table sorter plugin

This small script allows to sort table data by columns.
You can make sortable HTML tables easily with this plugin. 

## Usage:

1. Add JQuery and tablesorter.js script links to your HTML file.
2.  Call `.sortable` method to the selected element: For example: `$("#myTable").sortable(options);`
3.  Click to the header of your selected table.

## Options:
JSON object. Default options: 
`{showArrows: true, changeCursor: true, disabledRows: [] }`

You can disable the `nth` column sorting if you add `n` to `options.disabledRows` array.
You can also disable sorting if you add `nosort` class to the HTML table given `th` element.
