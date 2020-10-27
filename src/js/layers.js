class Layer {
	constructor(layerType) {
		this.type = layerType;

		this.protocols = new Array();

		this.html = null;
	}

	addProtocol(protocol) {
		this.protocols.push(protocol);
	}

	removeProtocol() {
		
	}

	generateHTML() {
		this.html = $('<div/>', {
	        'class': 'row layer ' + this.type + 'Layer'
	    });

	    if(this.protocols.length == 0) {
	    	this.html.append( '<div class="col emptyLayer">' + this.type + ' layer</div>' )
	    } else {
	    	this.protocols.forEach(protocol => this.html.append( protocol.html ));	
	    }
	}
}

class ApplicationLayer extends Layer {
	constructor() {
		super("application");

		this.generateHTML();
	}
}

class TransportLayer extends Layer {
	constructor() {
		super("transport");

		this.generateHTML();
	}
}

class NetworkLayer extends Layer {
	constructor() {
		super("network");

		this.generateHTML();
	}
}

class DataLinkLayer extends Layer {
	constructor() {
		super("data link");

		this.generateHTML();
	}
}

class PhysicalLayer extends Layer {
	constructor() {
		super("physical");

		this.generateHTML();
	}
}