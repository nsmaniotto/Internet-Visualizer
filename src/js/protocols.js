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
		var data = new ProtocolData(this.id, this.type);

		data.header = this.generateHeader();

		data.encapsulatedData = message;

		data.complementaryInformation = "N/A";

		return data;
	}

	decapsulate(data) {
		return data; // TODO : Specific behaviour to be defined
	}
}

class TCP extends Protocol {
	constructor() {
		super("TCP");

		this.generateHTML();
	}

	generateHeader() {
		return '';
	}
}

class UDP extends Protocol {
	constructor() {
		super("UDP");

		this.generateHTML();
	}

	generateHeader() {
		return '';
	}
}

class IP extends Protocol {
	constructor() {
		super("IP");

		this.generateHTML();
	}

	generateHeader() {
		return '';
	}
}

class ARP extends Protocol {
	constructor() {
		super("ARP");

		this.generateHTML();
	}

	generateHeader() {
		return '';
	}
}