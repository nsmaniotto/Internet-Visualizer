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

	generateHTML() {
		this.html = $('<div/>', {
	        'class': 'component ' + this.type + ' d-inline-block'
	    });

	    this.html.append( '<div class="row"><div class="col componentName">' + this.name + '</div></div>' );

		this.layers.forEach(layer => this.html.append( layer.html ));

		$('#sandbox').append(this.html);

		makeComponentDraggable(this.html);
	}
}

class Host extends Component {
	constructor(name) {
		super("host");

		this.name = name;

		this.initLayers();

		this.generateHTML();
	}
}

class Hub extends Component {
	constructor(name) {
		super("Hub");

		this.name = name;

		this.initLayers();

		this.generateHTML();
	}
}

class Switch extends Component {
	constructor(name) {
		super("switch");

		this.name = name;

		this.initLayers();

		this.generateHTML();
	}
}

class Router extends Component {
	constructor(name) {
		super("router");

		this.name = name;

		this.initLayers();

		this.generateHTML();
	}
}