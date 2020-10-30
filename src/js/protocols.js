var protocolsCounter = 0;

function makeProtocolDraggable(protocol) {
	protocol.html.draggable({
		containment: "#sandbox",
		scroll: false,
		cursor: "move",
		stop: function() {
			protocol.html.remove();
		}
	});
}

class Protocol {
	constructor(protocolType) {
		this.type = protocolType;

		this.id = this.generateProtocolId();

		this.layer = null;

		this.html = null;

		switch(this.type) {
			case "TCP":
			case "UDP":
				this.layer = "transport";
				break;
			case "IP":
			case "ARP":
				this.layer = "network";
				break;

			default:
				break;
		}
	}

	generateProtocolId() {
		var newProtocolId = this.type + protocolsCounter;

		protocolsCounter++;

		return newProtocolId;
	}

	generateHTML() {
		this.html = $('<div/>', {
			'id': this.id,
	        'class': 'col protocol ' + this.type + 'Protocol d-inline-block'
	    });
	    
	    this.html.append( this.type );

		makeProtocolDraggable(this);
	}

	encapsulate(message) {
		var data = {
		  'head': {'layer':this.layer, 'protocol': this.type}, 
		  'encapsulate': message,
		  'tail': null
		};

		return data;
	}
}

class TCP extends Protocol {
	constructor() {
		super("TCP");

		this.generateHTML();
	}
}

class UDP extends Protocol {
	constructor() {
		super("UDP");

		this.generateHTML();
	}
}

class IP extends Protocol {
	constructor() {
		super("IP");

		this.generateHTML();
	}
}

class ARP extends Protocol {
	constructor() {
		super("ARP");

		this.generateHTML();
	}
}