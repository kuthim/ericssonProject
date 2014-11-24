var addSwitch = false;
var removeSwitch = false;
var ptN;
var activePort;

$(document).ready(function(e) {
	$("#addSwitch").click(function(e){
		reset(remove);
		reset(removeSwitch);
		addSwitch = true;
		alert(addSwitch);
	});	
	$("#removeSwitch").click(function(e){
		reset(addSwitch);
		reset(remove);
		removeSwitch = true;
	});
	$("#cancel").click(function(e){
		reset(remove);
		addSwitch = false;
		removeSwitch = false;
	});	
	
	$("#mainTable").on("click", ".activeTool", function(e){
		//alert($(this).attr('id'));
		if(addSwitch == true){
			ptN = "#pt_"+$(this).attr("id");
			$(ptN).toggle();
			//alert($(ptN).attr("id"));
		}
	});
	
	$("#mainTable").on("click", ".port", function(e){
		
		activePort = $(this);
		if(arrangeS == false){
			$("#enablePorts").show();
			$("#enable_port").click(function(e1){
				//activePort.css("color","#eeeeef");
				activePort.css("background-color", "#00FF00");
				alert($(activePort).html());
				activePort.html($("#port_name").val());
				alert($(activePort).html());
				$("#enablePorts").hide();
				activePort.off(e1);
			});
			$("#cancel_enable").click(function(e2){
				$("#enablePorts").hide();
				
			});
			
		}
	});
	
});



