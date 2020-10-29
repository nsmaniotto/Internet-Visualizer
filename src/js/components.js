function makeComponentDraggable(component) {
	component.draggable({
		containment: "#sandbox",
		scroll: false,
		cursor: "move"
	});
}

class Component {
	constructor(componentType) {
		this.type = componentType;
		this.name = "unnamed_" + this.type;
		this.layers = new Array();
		this.interfaces = new Array();
		this.html = null;
	}

	init() {
		this.initLayers();
		this.initInterfaces();
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

		makeComponentDraggable(this.html);
	}

	generateData() {
		var data = "message";

		this.layers.forEach((layer, index, array) => {
		    data = layer.encapsulate(data);
		});

		return data;
	}
}

class Host extends Component {
	constructor(name) {
		super("host");

		this.name = name;

		this.init();

		this.generateData();

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