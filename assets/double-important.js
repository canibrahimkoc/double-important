	$(document).ready(function(){
		$.ajax({
			url:"assets/main.css",
            dataType:"script",
            cache: true,
			success:function(data){
				var $importData = data;
				// $("body").append("<div id='double-important'><style>" + $importData + "</style></div>");
				// $importData
			}
		});
	});