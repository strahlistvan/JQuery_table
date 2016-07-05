(function( $ ) {
		
		/** Sortable function */		
		$.fn.sortable = function()
		{
			return this.each(function() {
					var tableMatrix = [];
		var sortKey = 0;
		var callerID = "";  //store the caller element ID (ugly)
		var activeTable;  //store the active table element
		var reverse = false;

	   /** Stringify parameter object, or parse it to number (if it's numeric)  */
		function goodFormat(value)
		{
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
		var sortTableByKey = function(sortKey)
		{
			//Simple sorting algorithm:
			var N = tableMatrix[sortKey].length;
			for (var i=0 ; i<N; ++i)
			{
				for (var j=i; j<N; ++j)
				{
				    //two elements: if strings, lower case
					var elem_i = (isNaN(tableMatrix[sortKey][i])) ? tableMatrix[sortKey][i].toString().toLowerCase().trim() : tableMatrix[sortKey][i];
					var elem_j = (isNaN(tableMatrix[sortKey][j])) ? tableMatrix[sortKey][j].toString().toLowerCase().trim() : tableMatrix[sortKey][j];
						
					if ( (elem_i > elem_j && !reverse)
						|| (elem_i < elem_j && reverse))
					{			
					    //swap the elements in all columns
						for (var k in tableMatrix)
						{
							var tmp = tableMatrix[k][i];
							tableMatrix[k][i] = tableMatrix[k][j];
							tableMatrix[k][j] =tmp;
						}
					}
				}
			}
			//Insert sorted data to HTML table
			console.log("act table id:: "+activeTable.attr("id"));
			activeTable.find("tbody tr").each(function() {
				var rowIndex = $(this).index();
				var row = this;
							
				$(row).find("td").each(function(){
					var colIndex = $(this).index();
					var data = tableMatrix[colIndex][rowIndex]
					$(this).html(data); //insert data to HTML DOM
				});
							
			}); 
			reverse = !reverse;
			console.log(JSON.stringify(tableMatrix));
		}
				
				
				activeTable = $(this);
				console.log(activeTable);
				
				//Currently the table must contain thead and tbody children
				if (!$(this).find("thead tr th") || 
					 !$(this).find("tbody tr td") )
				{
					alert("Error! $("+$(this).selector+") element is not a valid  HTML table");
					return;
				}
			
				//Currently the sortable selector must be unique
				if ($(this).length > 1)
				{
					alert($(this).length);
					alert("Error! $("+$(this).selector+") Table selector is not unique!");
					return;
				}
			
				//if not have id, we add one (ugly solution)
				if (!$(this).attr("id"))
				{
					$(this).attr("id", (new Date()).getTime());
				}
				//Store the caller elements ID	
				 callerID = $(this).attr("id");   
				
				$(this).find("thead tr th").each(function(){
					var colIndex = $(this).index();
					tableMatrix[colIndex] = [ ];
								
					//Table styling...
					$(this).hover(function() {
						$(this).css("cursor", "pointer");
					});
					
					//click event on th element
					$(this).on("click", function(event){
						sortKey = $(event.target).index();
						sortTableByKey(sortKey);
						
								
					});
								
				});
											
				//Put data from HTML table to tableMatrix variable
				$(this).find("tbody tr td").each(function(){
						var colIndex = $(this).index();
						var data = goodFormat($(this).html());
					//	console.log(typeof data);
						tableMatrix[colIndex].push(data);	
				});
			}); //return for each
		} //end of function
} (jQuery));
