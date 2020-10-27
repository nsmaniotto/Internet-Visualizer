class Protocol {
	constructor(protocolType, associatedLayer) {
		this.type = protocolType;

		this.layer = associatedLayer;

		this.html = null;
	}

	generateHTML() {
		this.html = $('<div/>', {
	        'class': 'col protocol ' + this.type + 'Protocol'
	    });
	    
	    this.html.append( this.type );
	}
}

class TCP extends Protocol {
	constructor() {
		super("TCP", "transport");

		this.generateHTML();
	}
}

class UDP extends Protocol {
	constructor() {
		super("UDP", "transport");

		this.generateHTML();
	}
}

class IP extends Protocol {
	constructor() {
		super("IP", "network");

		this.generateHTML();
	}
}

class ARP extends Protocol {
	constructor() {
		super("ARP", "network");

		this.generateHTML();
	}
}