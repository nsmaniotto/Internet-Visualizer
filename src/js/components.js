// Make all the components draggable
function makeComponentDraggable(component) {
	component.draggable({
		containment: "#sandbox",
		scroll: false,
		cursor: "move"
	});
}

$('.component').draggable({
	containment: "#sandbox",
	scroll: false,
	cursor: "move"
});

class Host {
	constructor(name) {
		this.name = name;

		// Physical address
		
		// Add IP address

		// Add mask

		// Add interfaces

		// Generate HTML
		this.html = this.generateHTML();
	}

	generateHTML() {
		var table = $('<table/>', {
	        'class': 'component hostTable d-inline-block'
	    });

		table.append( '<thead><tr><td>' + this.name + '</td></tr></thead>' );

		table.append( '<tbody>' );

		for(var i = 1; i < 4; i++) {
		    table.append( '<tr class="layer"><td> </td></tr>' );
		}

		table.append( '</tbody>' );

		$('#sandbox').append(table);

		makeComponentDraggable(table);
	}
}

class Hub {
	constructor(name) {
		this.name = name;

		// Add links

		// Generate HTML
		this.html = this.generateHTML();
	}

	generateHTML() {
		var table = $('<table/>', {
	        'class': 'component hubTable d-inline-block'
	    });

		table.append( '<thead><tr><td>' + this.name + '</td></tr></thead>' );

		table.append( '<tbody>' );

		table.append( '</tbody>' );

		$('#sandbox').append(table);

		makeComponentDraggable(table);
	}
}

class Switch {
	constructor(name) {
		this.name = name;

		// Add ports
		this.html = this.generateHTML();
	}

	generateHTML() {
		var table = $('<table/>', {
	        'class': 'component switchTable d-inline-block'
	    });

		table.append( '<thead><tr><td>' + this.name + '</td></tr></thead>' );

		table.append( '<tbody>' );

		for(var i = 1; i < 3; i++) {
		    table.append( '<tr class="layer"><td> </td></tr>' );
		}

		table.append( '</tbody>' );

		$('#sandbox').append(table);

		makeComponentDraggable(table);
	}
}