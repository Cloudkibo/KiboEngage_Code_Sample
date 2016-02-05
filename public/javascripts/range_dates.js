function doSearch() {
var fr = $('#startdate').val();
var t = $('#enddate').val();
console.log(fr);
console.log(t);  
var d1 = fr.split("-");
var d2 = t.split("-");
var from = new Date(d1[0], d1[1]-1, d1[2]);  
var to   = new Date(d2[0], d2[1]-1, d2[2]);
console.log(from);
console.log(to); 


        var targetTable = document.getElementById('agents');
        var targetTableColCount;
        for (var rowIndex = 0; rowIndex < targetTable.rows.length; rowIndex++) {
            var rowData = [];
            if (rowIndex == 0) {
                targetTableColCount = targetTable.rows.item(rowIndex).cells.length;
                continue; 
            }

            for (var colIndex = 0; colIndex < targetTableColCount; colIndex++) {
                rowData.push(targetTable.rows.item(rowIndex).cells.item(colIndex).textContent);
            }
       var i=0;
		  while(i<rowData.length){
				var c = rowData[i].split("-");
      	var check = new Date(c[0], c[1]-1, c[2]);
        console.log(check)
        if ((check >= from) && (check <= to))
				    targetTable.rows.item(rowIndex).style.display = 'table-row';
				else
				    targetTable.rows.item(rowIndex).style.display = 'none';
        i=i+3;
		}

        }
    }