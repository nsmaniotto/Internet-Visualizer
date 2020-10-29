class Interface {
	constructor(interfaceName) {
		this.name = interfaceName;

		this.html = null;

		this.link1 = null;
		this.link2 = null;

		this.generateHTML();
	}

	generateHTML() {
		this.html = $('<div/>', {
	        'class': 'col interface ' + this.name
	    });

	    this.html.append( this.name );
	}
}