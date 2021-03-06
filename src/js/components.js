var componentsCounter = 0;

function makeComponentDraggable(component) {
	component.html.draggable({
		containment: "#sandbox",
		scroll: false,
		cursor: "move",
		drag: function() {
			redrawLinks(component);
		}
  	});
}

function redrawLinks(component) {
	component.interfaces.forEach(interf => interf.redrawLink() );
}

class Component {
	constructor(componentType) {
		this.type = componentType;
		this.name = "unnamed_" + this.type;
		this.id = this.generateComponentId();
		this.layers = new Array();
		this.interfaces = new Array();
		this.html = null;
	}

	generateComponentId() {
		var newId = 'component' + componentsCounter;

		componentsCounter++;

		return newId;
	}

	init() {
		this.initLayers();
		this.initInterfaces();

		componentsList.push(this); // Every component must be added to this list in order to be reached later
	}

	initLayers() {
		switch(this.type) {
			case "host":
				this.layers.push(new ApplicationLayer());
				this.layers.push(new TransportLayer());
				this.layers.push(new NetworkLayer());
				this.layers.push(new DataLinkLayer());
				this.layers.push(new PhysicalLayer());
				break;

			case "switch":
				this.layers.push(new DataLinkLayer());
				this.layers.push(new PhysicalLayer());
				break;

			case "router":
				this.layers.push(new NetworkLayer());
				this.layers.push(new DataLinkLayer());
				this.layers.push(new PhysicalLayer());
				break;

			default:
				break;
		}
	}

	initInterfaces() {
		switch(this.type) {
			case "host":
				this.addInterface(new Interface("eth0"));
				break;

			case "hub":
				this.addInterface(new Interface("eth0"));
				this.addInterface(new Interface("eth1"));
				this.addInterface(new Interface("eth2"));
				break;

			case "switch":
				this.addInterface(new Interface("eth0"));
				this.addInterface(new Interface("eth1"));
				this.addInterface(new Interface("eth2"));
				break;

			case "router":
				this.addInterface(new Interface("eth0"));
				this.addInterface(new Interface("eth1"));
				this.addInterface(new Interface("eth2"));
				break;

			default:
				break;
		}
	}

	addInterface(newInterface) { // 'interface' keyword is forbidden
		this.interfaces.push(newInterface);
	}

	generateHTML() {
		this.html = $('<div/>', {
			'id': this.id,
	        'class': 'component ' + this.type + ' d-inline-block'
	    });

	    this.html.append( '<div class="row"><div class="col componentName">' + this.name + '</div></div>' );

		this.layers.forEach(layer => this.html.append( layer.html ));

		var interfacesHTML = $('<div/>', {
	        'class': 'row interfaces'
	    });

		this.interfaces.forEach(interf => interfacesHTML.append( interf.html ));

		this.html.append( interfacesHTML );

		$('#sandbox').append(this.html);

		makeComponentDraggable(this);
	}

	generateData(dataToTransmit) {
		var data = new ComponentData(this.id, this.type);

		this.layers.forEach((layer, index, array) => {
		    var tempData = layer.encapsulate(dataToTransmit);

		    if(tempData.isSubSequence) {
		    	tempData.isSubSequence = false;

		    	for(var i = index + 1; i < array.length; i++) {
		    		tempData = array[i].encapsulate(tempData);
		    	}

		    	// Send tempData to aquire needed response and informations
		    	this.send(tempData);

		    	dataToTransmit = layer.encapsulate(dataToTransmit);
		    } else {
		    	dataToTransmit = tempData;
		    }
		});

		this.send(dataToTransmit);

		data.encapsulatedData = dataToTransmit;

		data.complementaryInformation = "N/A";

		return data;
	}

	send(dataToTransmit) {
		var interfaceName = "eth0";
		var interfaceToUse = null; // 'interface' keyword is forbidden
		var destination = null;

		// TODO : Determine whom to send the data
		// get the destination address
		// get the corresponding interface

		// Retrieve the component which is linked to this interface
		interfaceToUse = this.interfaces.find(element => element.name == interfaceName);

		if(interfaceToUse != null && interfaceToUse.link2 != null) {
			destination = componentsList.find(element => element.hasInterface(interfaceToUse));

			if(destination != null) {
				destination.receive(dataToTransmit);
			}
		}
	}

	receive(receivedData) {
		var i = 0;

		while(receivedData != null && i < this.layers.length) {
			if(receivedData.encapsulatorType == "layer") {
				// Only count layers because we are accessing this.layers[] with i
				i++;
			}

			if(receivedData.encapsulatedData != null) {
				var tempData = this.layers[this.layers.length - i].decapsulate(receivedData);

				if(tempData.isSubSequence) {
					tempData.isSubSequence = false;

			    	for(var j = i; i < this.layers.length; j++) {
			    		tempData = this.layers[i].encapsulate(tempData);
			    	}

			    	// Send tempData to aquire needed response and informations
			    	this.send(tempData);

			    	receivedData = this.layers[this.layers.length - i].decapsulate(receivedData).encapsulatedData;
			    } else {
			    	receivedData = tempData.encapsulatedData;
			    }
			}

			if(receivedData.encapsulatorType != "layer") {
				// Jump to the next layer
				receivedData = receivedData.encapsulatedData;
			}
		}
	}

	hasInterface(interf) {
		return (this.interfaces.find(element => element.link1 == interf.link2.link1) != null);
	}
}

class Host extends Component {
	constructor(name) {
		super("host");

		this.name = name;

		this.init();

		this.generateHTML();
	}
}

class Hub extends Component {
	constructor(name) {
		super("hub");

		this.name = name;

		this.init();

		this.generateHTML();
	}
}

class Switch extends Component {
	constructor(name) {
		super("switch");

		this.name = name;

		this.init();

		this.generateHTML();
	}
}

class Router extends Component {
	constructor(name) {
		super("router");

		this.name = name;

		this.init();

		this.generateHTML();
	}
}