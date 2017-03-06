	var markerSize = { x: 22, y: 40 };
	
	google.maps.Marker.prototype.setLabel = function(label){
			this.label = new LabelMarker({
				map: map,
				marker: this,
				text: label
			});
			this.label.bindTo('position', this, 'position');		
	};

	var LabelMarker = function(options) {
			this.setValues(options);
			this.span = document.createElement('span');
			this.span.className = 'map-label-marker';
			this.setMap(options.map);
	};
	
	LabelMarker.prototype = new google.maps.OverlayView();
	
	LabelMarker.prototype.onAdd = function() {
		this.getPanes().overlayImage.appendChild(this.span);
		var self = this;
		this.listeners = [google.maps.event.addListener(this, 'position_changed', function() { self.draw();})];
	}
	LabelMarker.prototype.draw = function() {
		var text = String(this.get('text'));
		var position = this.getProjection().fromLatLngToDivPixel(this.get('position'));
		this.span.innerHTML = text;
		this.span.style.left = (position.x - (markerSize.x / 2)) - (text.length * 3) + 10 + 'px';
		this.span.style.top = (position.y - markerSize.y + 12) + 'px';
	}
	LabelMarker.prototype.onRemove = function() {
		this.span.parentNode.removeChild(this.span);
	}

