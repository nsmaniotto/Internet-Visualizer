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
				this.layers.push("application layer");
				this.layers.push("transport layer");
				this.layers.push("internet layer");
				this.layers.push("data link layer");
				this.layers.push("physical layer");
				break;

			case "switch":
				this.layers.push("internet layer");
				this.layers.push("data link layer");
				this.layers.push("physical layer");
				break;

			default:
				break;
		}
	}

	generateHTML() {
		this.html = $('<table/>', {
	        'class': 'component ' + this.type + ' d-inline-block'
	    });

		this.html.append( '<thead><tr><td>' + this.name + '</td></tr></thead>' );

		this.html.append( '<tbody>' );

	    this.layers.forEach(layerName => this.html.append( '<tr class="layer"><td> ' + layerName + ' </td></tr>' ));

		this.html.append( '</tbody>' );

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