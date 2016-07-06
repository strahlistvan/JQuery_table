/** Default option variables */
var showArrows = true;
var changeCursor = true;;
var disabledColumns = [];

(function($) {
	
    /** Stringify parameter object, or parse it to number (if it's numeric)  */
    function goodFormat(value) {
        if (isNaN(value))
            return value.toString().trim();
        if (value == parseInt(value))
            return parseInt(value);
        else
            return parseFloat(value);
    }

    /** Sort the tableMatrix variable. 
     * Sort key: index of the selected column
     */
    var sortTableByKey = function(tableMatrix, sortKey, reverse) {
            //Simple sorting algorithm:
            var N = tableMatrix[sortKey].length;
            for (var i = 0; i < N; ++i) {
                for (var j = i; j < N; ++j) {
                    //two elements: if strings, lower case
                    var elem_i = (isNaN(tableMatrix[sortKey][i])) ? tableMatrix[sortKey][i].toString().toLowerCase().trim() : tableMatrix[sortKey][i];
                    var elem_j = (isNaN(tableMatrix[sortKey][j])) ? tableMatrix[sortKey][j].toString().toLowerCase().trim() : tableMatrix[sortKey][j];

                    if ((elem_i > elem_j && !reverse) ||
                        (elem_i < elem_j && reverse)) {
                        //swap the elements in all columns
                        for (var k in tableMatrix) {
                            var tmp = tableMatrix[k][i];
                            tableMatrix[k][i] = tableMatrix[k][j];
                            tableMatrix[k][j] = tmp;
                        }
                    }
                }//end for j
            }//end for i
            console.log(JSON.stringify(tableMatrix));
            return tableMatrix;
        } //end of function

    /** Sortable plugin function */
    $.fn.sortable = function(options) {
		
			/* Extend options */
			var options = $.extend({showArrows: showArrows, 
									changeCursor: changeCursor,
									disabledColumns: disabledColumns }
						 ,options);
			/* Return each selected element */													
            return this.each(function() {
                var tableMatrix = [];       // it will contain the selected HTML table values
                var sortKey = 0;            // index of the column which is sorted
                var activeTable = $(this); // store the active table element
                var reverse = false;       // sort parameter: increasing (false) or decreasing (true)
			
                //Currently the table must contain thead and tbody children
                if (!activeTable.find("thead tr th") ||
                    !activeTable.find("tbody tr td")) {
                    alert("Error! $(" + activeTable.selector + ") element is not a valid  HTML table");
                    return;
                }

                $(this).find("thead tr th").each(function() {
					var column = $(this);
                    var colIndex = $(this).index();
                    
                    //disable sorting columns with .nosort class
                //    if (column.hasClass("nosort")){
				//		options.disabledColumns.push(colIndex+1);
				//	}
                    
                    tableMatrix[colIndex] = [];

                    //Table styling...
                    column.hover(function() {
						if (options.changeCursor && options.disabledColumns.indexOf(sortKey+1) == -1) {
							column.css("cursor", "pointer");
						}
                    });                    
                });//end thead iterator

                    //click event on th element
                    activeTable.on("click", function(event) {
                        sortKey = $(event.target).index();
                        
                        //it the given column is not sortable
                        if ($(event.target).hasClass("nosort"))
							return;
                        
                        //it the given column is not sortable
                        if (options.disabledColumns.indexOf(sortKey+1) != -1)
							return;
                        
                        tableMatrix = sortTableByKey(tableMatrix, sortKey, reverse);
                        reverse = !reverse;
                        
                        //arrows (optional)
                        if (options.showArrows) {
							activeTable.find("thead tr th").each(function(){
								var content = $(this).html();
								content = content.replace(/(\uffea|\uffec)+/g,'');
								$(this).html(content);
							});
							var arrow = (reverse)? "&#65514;" : "&#65516;";
							$(event.target).html(arrow+$(event.target).html());
						}
                        //Insert sorted data to HTML table
                        activeTable.find("tbody tr").each(function() {
                            var rowIndex = $(this).index();
                            var row = this;

                            $(row).find("td").each(function() {
                                var colIndex = $(this).index();
                                var data = tableMatrix[colIndex][rowIndex]
                                $(this).html(data); //insert data to HTML DOM
                            });
                        });
                    }); //end onclick event

                //Put data from HTML table to tableMatrix variable
                $(this).find("tbody tr td").each(function() {
                    var colIndex = $(this).index();
                    var data = goodFormat($(this).html());
                    tableMatrix[colIndex].push(data);
                });
            }); //return this each
        } //end of function
}(jQuery));
