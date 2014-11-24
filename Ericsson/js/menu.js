var dropDown = [];

$(document).ready(function() {
	createDropDown('.menu', '.Files', '.subFiles');	 
	createDropDown('.menu', '.Admin', '.subAdmin');	  
	createDropDown('.menu', '.Export', '.subExport');
	createDropDown('.menu', '.Help', '.subExport');		
	createDropDown('#topMenu', '.Router', '.subRouter');	
	createDropDown('#topMenu', '#createMenu', '#subCreateMenu');	
	createDropDown('#topMenu', '#Switch', '#Switch');	
});
	
function createDropDown(back, hol, subhol){
	var str1 = back + ' > ul';
	var str2 = hol + ' js';
	$(str1).toggleClass(str2);
	str1 = back + ' ' + hol + ' ul';
	str2 = back + ' ' + hol;
	  $(str1).hide();
	  $(str2).click(function(e) {
		 $(str1).slideToggle(200);
		 $(back).toggleClass('active');
		 e.stopPropagation();
	  });

	  $(document).click(function() {
		 if ($(str1).is(':visible')) {
			$(str1, this).slideUp();
			$(subhol).removeClass('active');
		 }
	  });
}


