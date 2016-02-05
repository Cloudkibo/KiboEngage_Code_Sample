$(document).ready(function(){
        $("#min").datepicker({ dateFormat: "dd-mm-yyyy" }).val()
        $("#max").datepicker({ dateFormat: "dd-mm-yyyy" }).val()

        var oTable=$('#example').dataTable();

        /* Add event listeners to the two date-range filtering inputs */

    $('#min').change( function() { oTable.fnDraw(); } );
        $('#max').change( function() { oTable.fnDraw(); } );
    });