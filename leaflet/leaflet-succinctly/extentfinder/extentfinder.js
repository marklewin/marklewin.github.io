var map;

function init() {

    map = L.map('map', {
        center: [0,0],
        zoom: 3
    });

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	   attribution: 'OpenStreetMap'
    }).addTo(map);

    map.on('move', function(e) {
        infobox.refresh(getCurrentCenterAndZoom());
    });

    var infobox = L.control({
        position: 'bottomleft'
    });

    infobox.onAdd = function (e) {
        this._div = L.DomUtil.create('div', 'info');
        this.refresh(getCurrentCenterAndZoom());
        return this._div;
    };

    infobox.refresh = function (properties) {
        this._div.innerHTML = '<h4>Current Map Center and Zoom</h4>';
        this._div.innerHTML += '&nbsp;<b>Lat</b>: ' + properties.lat + '<br/>' + '<b>&nbsp;Lng</b>: ' + properties.lng + '<br/>' + '<b>&nbsp;Zoom level</b>: ' + properties.zoom + '<br/><br/>';
        this._div.innerHTML += '<button type="button" onclick="downloadMapCode()">Get Map Code</button>';

    };
    infobox.addTo(map);
}

function getCurrentCenterAndZoom () {
    var obj = {
        lat: map.getCenter().lat,
        lng: map.getCenter().lng,
        zoom: map.getZoom()
    };
    return obj;
}

function downloadMapCode() {
    var obj = getCurrentCenterAndZoom();
    var str = "var map = L.map('map').setView([" + obj.lat + ", " + obj.lng + "]," + obj.zoom + ");";
    copyToClipboard(str);
}

function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}
