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

	addProtocol(protocol) {
		var alreadyExists = false;

		if(this.protocols.length == 0) {
			this.html.find( '.emptyLayer' ).remove();
		} else {
			if((this.protocols.find(existingProtocol => existingProtocol.type == protocol.type)) != null) {
				alreadyExists = true;
			}
		}
		
		if(!alreadyExists) {
			this.html.append(protocol.html);

			this.protocols.push(protocol);
		}
	}

	removeProtocol(protocol) {
		// Find related protocol index in the protocols array
		var foundProtocolIndex = this.protocols.indexOf(protocol);

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
			this.removeProtocol(foundProtocol);
		}
	}

	generateHTML() {
		this.html = $('<div/>', {
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

	encapsulate(message) {
		var data = {
		  'head': {'layer':'application', 'protocol': null}, 
		  'encapsulate': message,
		  'tail': null
		};

		return data;
	}
}

class TransportLayer extends Layer {
	constructor() {
		super("transport");

		this.generateHTML();
	}

	encapsulate(data) {
		var segment = null;

		if(this.protocols.length != 0) {
			segment = this.protocols[0].encapsulate(data);
		} else {
			segment = {
			  'head': {'layer':'transport', 'protocol': null}, 
			  'encapsulate': data,
			  'tail': null
			};
		}

		return segment;
	}
}

class NetworkLayer extends Layer {
	constructor() {
		super("network");

		this.generateHTML();
	}

	encapsulate(segment) {
		var packet = null;

		if(this.protocols.length != 0) {
			packet = this.protocols[0].encapsulate(segment);
		} else {
			packet = {
			  'head': {'layer':'network', 'protocol': null}, 
			  'encapsulate': segment,
			  'tail': null
			};
		}

		return packet;
	}
}

class DataLinkLayer extends Layer {
	constructor() {
		super("data link");

		this.generateHTML();
	}

	encapsulate(packet) {
		var frame = null;

		if(this.protocols.length != 0) {
			frame = this.protocols[0].encapsulate(packet);
		} else {
			frame = {
			  'head': {'layer':'data link', 'protocol': null}, 
			  'encapsulate': packet,
			  'tail': null
			};
		}

		return frame;
	}
}

class PhysicalLayer extends Layer {
	constructor() {
		super("physical");

		this.generateHTML();
	}

	encapsulate(frame) {
		var bits = null;

		if(this.protocols.length != 0) {
			bits = this.protocols[0].encapsulate(frame);
		} else {
			bits = {
			  'head': {'layer':'physical', 'protocol': null}, 
			  'encapsulate': frame,
			  'tail': null
			};
		}

		return bits;
	}
}