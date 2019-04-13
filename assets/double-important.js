	$(document).ready(function(){
		$.ajax({
			url:"assets/main.css",
            dataType:"script",
            cache: true,
			success:function(data){
				$("body").append("<div id='double-important'><style>" + data + "</style></div>");
			}
        });
        var hardImport = " !important;"  
	});