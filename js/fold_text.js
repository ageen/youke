$(function(){
	var slideHeight = 30; // px
	//var defHeight = 200;
	var defHeight = $('#wrap').height();
	console.log(defHeight);
	if(defHeight >= slideHeight){
		$('#wrap').css('height' , slideHeight + 'px');
		$('#read-more').append('<a href="#"><span class="glyphicon glyphicon-menu-down"></span></a>');
		$('#read-more a').click(function(){
			var curHeight = $('#wrap').height();
			if(curHeight == slideHeight){
				$('#wrap').animate({
				  height: defHeight
				}, "normal");
				$('#read-more a').html('<a href="#"><span class="glyphicon glyphicon-menu-up"></span></a>');

			}else{
				$('#wrap').animate({
				 height: slideHeight
				}, "normal");
				$('#read-more a').html('<a href="#"><span class="glyphicon glyphicon-menu-down"></span></a>');
			}
			return false;
		});		
	}
});