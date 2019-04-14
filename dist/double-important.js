$(document).ready(function(){
	$.ajax({
		url:"../dist/double-important.css",
		dataType:"script",
		cache: true,
		success:function(data){
			var $importData = data;
			//$("body").append("<div id='double-important'><style>" + $importData + "</style></div>");
			// $importData
		}
	});
});