$(function(){
	$("#select_area").click(function(){
		var element = $("#select_area .glyphicon")
		if(element.hasClass("glyphicon-menu-up")){
			showOverlay();
			$("#parent-menu").slideDown();
			element.removeClass("glyphicon-menu-up");
			element.addClass("glyphicon-menu-down");
		}else{
			hideOverlay()
			$("#parent-menu").slideUp();
			$("#sub-menu").hide();
			element.removeClass("glyphicon-menu-down");
			element.addClass("glyphicon-menu-up");
		}
	});
});