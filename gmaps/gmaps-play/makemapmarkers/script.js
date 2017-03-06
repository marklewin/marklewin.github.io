var map;
var outStart = "<pre><![CDATA[" + "\n"
var outEnd = "\n" + "]]></pre>";
var labelCount = 1;
var drawingManager = null;
var outContent = "";
var outCSV = [];
var markersArray = [];
var csvHeader = '"ID",' + '"Latitude",' + '"Longitude"';

function initialize() {
  var mapOptions = {
    //center: new google.maps.LatLng(63.549, -12.305),
		center: new google.maps.LatLng(27.527758206861883, -29.70703125),
    zoom: 3
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  drawingManager = new google.maps.drawing.DrawingManager();
	setDrawingOptions(labelCount);
	
	google.maps.event.addListener(drawingManager, 'overlaycomplete', drawFinished);
	
  drawingManager.setMap(map);
	outCSV.push(csvHeader); 
}

function drawFinished(e) {
	var shape = e.overlay;
	markersArray.push(shape);
	var outputPane = document.getElementById("code-canvas");
	var output="";
	outCSV.push('"' + labelCount + '","' + shape.getPosition().lat() + '","' + shape.getPosition().lng() + '"');
	outContent += "<b>ID: </b>" + labelCount  + "    <b>Coords: </b>" + shape.getPosition().lat() + ", " + shape.getPosition().lng() + "<br />";
	document.getElementById("code-canvas").innerHTML = outContent + "<br /><button id='btnExport' onclick='exportCSV()'>Export CSV</button>"
																																+ "<button id='btnReset' onclick='reset()'>Reset</button><br />"
																																+ "<div id='downloadCSV'></div>";
	setDrawingOptions(++labelCount);
}

function setDrawingOptions(labelNumber) {
	  
	drawingManager.setOptions({	
		//drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.MARKER
      ]
    },

		markerOptions: {
			label: labelNumber
		}
	});
}

function exportCSV() {
	// download stuff
	var fileName = "mapmarkers.csv";
	var buffer = outCSV.join("\r\n");	


	var blob = new Blob([buffer], {
		"type": "text/csv;charset=utf8;"			
	});

	var link = document.createElement("a");
	link.innerHTML="Download";
	
	// Feature detection	
	if(link.download !== undefined) {	
		// Browsers that support HTML5 download attribute
		link.setAttribute("href", window.URL.createObjectURL(blob));
		link.setAttribute("download", fileName);
		document.getElementById("downloadCSV").appendChild(link);	
	} else if (window.navigator.msSaveOrOpenBlob) {
		// I'm guessing that this is IE, and we need to do things differently
		link.setAttribute('href', 'javascript:void(0)');
		link.onclick = function() { window.navigator.msSaveOrOpenBlob(blob, fileName); };
		document.getElementById("downloadCSV").appendChild(link);				
	} else {
		alert("Your browser does not support this feature.");
	}
}

function reset() {
	deleteOverlays();
	labelCount = 1;
	setDrawingOptions(labelCount);
	outContent = "";
	outCSV = [];
	outCSV.push(csvHeader); 
	document.getElementById("code-canvas").innerHTML = "<p>Click the marker tool at the top of the map and start placing markers at points of interest. Each marker will be given an auto-generated identifier, and it's coordinates will appear here, along with a button that will allow you to download your point data	as a CSV file.</p>";
}

function deleteOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(null);
			markersArray[i].label.setMap(null);
    }
    markersArray.length = 0;
  }
}

google.maps.event.addDomListener(window, 'load', initialize);