
$(document).ready(function() {
	
	$("#newProp").click(function(){
		alert("new project");
		$("#new_popProp").show();
		$("#cancel_pro").click(function(){
			$("#new_popProp").hide();
		});
	});
	
	$("#saveAs").click(function(){
		
		$("#saveProp").show();
		
		//alert(name);
		$("#save_pro").click(function(){
			var name = $("#save_pro_name").val();
			$.ajax({
				type: "POST",
				url: "php/saveLoad.php",
				data: {"myName" : name},
				success: function(response){
					alert(response);
				},
				error: function(){
					alert("An error occurred");
				}
			});
			$("#saveProp").hide();
		});
		$("#cancel_save").click(function(){
			$("#saveProp").hide();
		});
	});
	
	
	$("#openProp").click(function(){
		alert("load file");
		$.ajax({
			type: "GET",
			url: "xml/test.xml",
			dataType: "xml",
			success: function(xml){
				$(xml).find('cars').each(function(){
					var title = $(this).find('Title').text();
					alert(title);
				});
			},
			error: function(){
				alert("An error occurred");
			}
		});
	});
});

