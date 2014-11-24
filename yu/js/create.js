var remove = false;
var arrangeS = false;
var routers = {};

// main
$(document).ready(function() {
	$("#popProp").hide();//dialog({ autoOpen: false});
	$("#new_popProp").hide();
	$("#new_popProp").draggable();
	$("#saveProp").hide();
	$("#saveProp").draggable();
	$("#enablePorts").hide();
	$("#enablePorts").draggable();
	createNewListenser("IPOS");	 
	createNewListenser("SSRS");
	createNewListenser("SPIR");
	createNewListenser("Linux");
	createNewListenser("Traffic");
	
	$("#remove").click(function(){
		reset(addSwitch);
		reset(removeSwitch);
		if(remove == false)
			remove = true;
		else
			remove = false;
	});	
	$("#mainTable").on("click", ".activeTool", function(e){
		//alert($(".activeTool").attr('id'));
		//$(".activeTool").draggable();
		if(remove == true)
			$(this).remove();
			remove = false;
	});
	
	$("#mainTable").on("click", ".arrange", function(e){
		alert(arrangeS);
		if(arrangeS == false){
			arrangeS = true;
			$(this).css('border-color', '#00FF00');
			$(".port").draggable({
				containment:$(".portTable"),
				disable:false
			});
			$(".port").draggable("enable");
		}
		else{
			arrangeS = false;
			
			$(this).css('border-color', '#BDBDBD');
			$(".port").draggable({
				disabled:true
			});
			
		}
	});
	
	
});

// create New router
function createNew(type, name, prop){
	var newVM = document.createElement('div');
	var newPT = document.createElement('div');
	var arrange = document.createElement('div');
	
	var itemType = type+"_"+name;
	newVM.id = itemType;
	newVM.className = "activeTool";
	newVM.style.top = "170px";
	newVM.style.right = "140px";
	newVM.innerHTML = name;
	//newPort("100px","100px","port1", newVM);
	
	itemType = "pt_"+itemType;
	
	newPT.id = itemType;
	newPT.className = "portTable";
		
	$("#mainTable").append(newVM);	
	//var $readyVM = newVM.cloneNode(true);
	routers[name] = prop;
	//alert(routers[name]["port"]);
	
	arrange.className = "arrange";
	arrange.innerHTML = "arrange ports";
	
	
	$(newPT).css({
		position: "absolute",
		marginLeft: 0, marginTop:0,
		width: "200px",
		height: "150px",
		top:"-15.8em", left: 0
	}).appendTo(newVM);
	
	$(arrange).css({
		position: "absolute",
		marginLeft: 0, marginTop:0,
		width: "60px",
		height: "10px",
		top: "63px", left: "67px"
	}).appendTo(newPT);
	
	//alert($(newPT).css("width"));
	numPorts = parseInt(routers[name]["port"])
	
	var tmp = parseInt((200 + 150*2) / (numPorts));
	
	if(numPorts<25 && numPorts > 11){
		tmp = tmp / 1.2;
	}
	else if(numPorts<12 && numPorts > 7){
		tmp = tmp / 1.4;
	}
	else if(numPorts<7 && numPorts > 4){
		tmp = tmp / 3;
	}
	else if(numPorts < 4){
		tmp = tmp / 10;
	}
	
	var tmp1;
	
	//alert(tmp);
	var count = 1;
	var count1 = numPorts;
	
	for(var i=tmp; i< 150 - tmp; i = i + tmp){
		
		var portN = name + "_port_" + count;
		//alert(portN);
		if(numPorts > 0)
			addNewPort(i, tmp, portN, count, newPT, newVM);
		count++;
		numPorts--;
		var portN = name + "_port_" + count;
		if(numPorts > 0)
			addNewPort(i, 200-tmp, portN,count1, newPT, newVM);
		count1--;
		numPorts--;
		tmp1 = i;
	}
	
	for(var i=tmp*2; i< 200 - tmp*3/2; i = i + tmp){
		
		var portN = name + "_port_" + count;
		//alert(portN);
		if(numPorts > 0)
			addNewPort(tmp, i, portN, count1, newPT, newVM);
		count1--;
		numPorts--;
		var portN = name + "_port_" + count;
		if(numPorts > 0)
			addNewPort(tmp1, i, portN, count, newPT, newVM);
		count++;
		numPorts--;
	}
	
	$(newPT).hide();
	$(newVM).draggable();
	
};

// get user input
function createNewListenser(type){
	document.getElementById(type).onclick = function () {
		//var routerProperty = {};
		$("#popProp").draggable();
		$("#popProp").show();//dialog({ autoOpen: true});
		$("#createNew").click(function(){
			
			if($("#deviceName").val() == '' || !$("#deviceName").val().match(/[A-Za-z0-9_-]/)){
				alert("Invalid Device Name!");
				$("#deviceName").css('border-color', '#610B0B');
			}
			else if($("#numPorts").val() == '' || parseInt($("#numPorts").val()) > 40){
				$("#deviceName").css('border-color', 'white');
				alert("Invalid port number");
				$("#numPorts").css('border-color', '#610B0B');
			}
			else{
				$("#numPorts").css('border-color', 'white');
				
				// Dictionary for router's property
				var routerProperty = {
					"name":	$("#deviceName").val(),
					"port": $("#numPorts").val()
				};
				//alert(routerProperty["port"]);
				createNew(type, $("#deviceName").val(), routerProperty);
				$("#popProp").hide();
				$('.rProp').val("");
			}
		});
		
		$("#cancelNew").click(function(){
			$('.rProp').val("");
			$("#popProp").hide();
			$("#deviceName").css('border-color', 'white');
			$("#numPorts").css('border-color', 'white');
		});
		
	};
}


function addNewPort(top, left, name, count, routerTable,router){
	
	newPort = document.createElement('div');
	newPort.id = name;
	newPort.className = "port";
	newPort.innerHTML = count;
	var p_top = top+"px";
	var p_left = left+"px";
	//alert("here");
	$(newPort).css({
		position: "absolute",
		marginLeft: 0, marginTop:0,
		top:p_top, left: p_left
	}).appendTo(routerTable);
	
	activePort = document.createElement('div');
	activePort.id = "act_"+name;
	activePort.className = "activePort";
	top = top*2/5;
	
	left = left/ 2;
	
	p_top = top+"px";
	//alert(p_top)
	p_left = left+"px";
	//alert(p_left)
	//alert("here");
	$(activePort).css({
		position: "absolute",
		marginLeft: 0, marginTop:0,
		top:p_top, left:p_left
	}).appendTo(router);
	
	
}


// reset value
function reset(state){
	if(reset == true)
		reset = false;
	
}


