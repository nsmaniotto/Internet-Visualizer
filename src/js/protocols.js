class Protocol {
	constructor(protocolType) {
		this.type = protocolType;

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

	generateHTML() {
		this.html = $('<div/>', {
	        'class': 'col protocol ' + this.type + 'Protocol'
	    });
	    
	    this.html.append( this.type );
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