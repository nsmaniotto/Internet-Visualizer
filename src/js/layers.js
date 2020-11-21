var layersCounter = 0;

function makeLayerDroppable(layer) {
	layer.html.droppable({
		accept: ".protocol",
		drop: function(event, ui) {
	    	var newProtocol = null;

	        if(ui.draggable.hasClass('IPProtocol'))
	        {
	        	newProtocol = new IP();
	        } else if(ui.draggable.hasClass('TCPProtocol'))
	        {
	        	newProtocol = new TCP();
	        }

	        if(newProtocol != null) {
	        	if(newProtocol.layer == layer.type) {
	        		layer.addProtocol(newProtocol);
	        	} else {
	        		// Wrong layer
	        	}
	        }
	    },
	    out: function(event, ui) {
	    	var protocolLayerType = null;

	        if(ui.draggable.hasClass('IPProtocol'))
	        {
	        	protocolLayerType = "network";
	        } else if(ui.draggable.hasClass('TCPProtocol'))
	        {
	        	protocolLayerType = "transport";
	        }

	        if(protocolLayerType != null) {
	        	if(protocolLayerType == layer.type) {
	        		layer.removeProtocolByHTML(ui.draggable);
	        	}
	        }
	    }
	});
}

class Layer {
	constructor(layerType) {
		this.type = layerType;

		this.id = this.generateLayerId();

		this.dataName = null;

		this.protocols = new Array();

		this.html = null;

		switch(this.type) {
			case "application":
				this.dataName = "data";
				break;
			case "transport":
				this.dataName = "segment";
				break;
			case "network":
				this.dataName = "packet";
				break;
			case "data link":
				this.dataName = "frame";
				break;
			case "physical":
				this.dataName = "bits";
				break;

			default:
				break;
		}
	}

	encapsulate(data) {
		var generatedData = this.specificEncapsulate(data);

		simulation.datas.push(generatedData);
	}

	generateLayerId() {
		var newId = 'layer' + layersCounter;

		layersCounter++;

		return newId;
	}

	addProtocol(newProtocol) {
		var existingProtocol = null;

		if(this.protocols.length == 0) {
			this.html.find( '.emptyLayer' ).remove();
		} else {
			existingProtocol = this.protocols.find(element => element.type == newProtocol.type);
		}
		
		if(existingProtocol == null) {
			this.html.append(newProtocol.html);
			this.protocols.push(newProtocol);
		} else {
			// Replace existingProtocol by the newProtocol
			this.removeProtocol(existingProtocol, true);

			this.addProtocol(newProtocol);
		}
	}

	removeProtocol(protocol, removeHtml) {
		// Find related protocol index in the protocols array
		var foundProtocolIndex = this.protocols.indexOf(protocol);

		// Remove protocol div if required
		if(removeHtml) {
			protocol.html.remove();
		}

		// Remove protocol from array
		this.protocols.splice(foundProtocolIndex, 1);

		// Regenerate default description if layer is empty
		if(this.protocols.length == 0) {
			this.html.append( '<div class="col emptyLayer">' + this.type + ' layer</div>' );
		}
	}

	removeProtocolByHTML(htmlProtocol) {
		// Find related protocol in the protocols array
		var foundProtocol = this.protocols.find(protocol => htmlProtocol.is( '#' + protocol.id));

		if(foundProtocol != null) {
			this.removeProtocol(foundProtocol, false);
		}
	}

	generateHTML() {
		this.html = $('<div/>', {
			'id': this.id,
	        'class': 'row layer ' + this.type + 'Layer'
	    });

	    if(this.protocols.length == 0) {
	    	this.html.append( '<div class="col emptyLayer">' + this.type + ' layer</div>' );
	    } else {
	    	this.protocols.forEach(protocol => this.html.append( protocol.html ));	
	    }

	    makeLayerDroppable(this);
	}
}

class ApplicationLayer extends Layer {
	constructor() {
		super("application");

		this.generateHTML();
	}

	specificEncapsulate(message) {
		var data = new LayerData(this.id, this.type);

		data.encapsulatedData = message;
		data.type = this.dataName;

		data.complementaryInformation = "N/A";

		return data;
	}
}

class TransportLayer extends Layer {
	constructor() {
		super("transport");

		this.generateHTML();
	}

	specificEncapsulate(data) {
		var segment = new LayerData(this.id, this.type);

		if(this.protocols.length != 0) {
			segment.encapsulatedData = this.protocols[0].encapsulate(data);
		} else {
			segment.encapsulatedData = data;
		}

		segment.type = this.dataName;

		segment.complementaryInformation = "N/A";

		return segment;
	}
}

class NetworkLayer extends Layer {
	constructor() {
		super("network");

		this.generateHTML();
	}

	specificEncapsulate(segment) {
		var packet = new LayerData(this.id, this.type);

		if(this.protocols.length != 0) {
			packet.encapsulatedData = this.protocols[0].encapsulate(segment);
		} else {
			packet.encapsulatedData = segment;
		}

		packet.type = this.dataName;

		packet.complementaryInformation = "N/A";

		return packet;
	}
}

class DataLinkLayer extends Layer {
	constructor() {
		super("data link");

		this.generateHTML();
	}

	specificEncapsulate(packet) {
		var frame = new LayerData(this.id, this.type);

		if(this.protocols.length != 0) {
			frame.encapsulatedData = this.protocols[0].encapsulate(data);
		} else {
			frame.encapsulatedData = packet;
		}

		frame.type = this.dataName;

		frame.complementaryInformation = "N/A";

		return frame;
	}
}

class PhysicalLayer extends Layer {
	constructor() {
		super("physical");

		this.generateHTML();
	}

	specificEncapsulate(frame) {
		var bits = new LayerData(this.id, this.type);

		if(this.protocols.length != 0) {
			bits.encapsulatedData = this.protocols[0].encapsulate(data);
		} else {
			bits.encapsulatedData = frame;
		}

		bits.type = this.dataName;

		bits.complementaryInformation = "N/A";

		return bits;
	}
}