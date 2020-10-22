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
	        'class': 'component hostTable'
	    });

		table.append( '<thead><tr><td>' + this.name + '</td></tr></thead>' );

		table.append( '<tbody>' );

		for(var i = 1; i < 4; i++) {
		    table.append( '<tr class="layer"><td> </td></tr>' );
		}

		table.append( '</tbody>' );

		$('#sandbox').append(table);
	}
}

class Hub {
	constructor(name) {
		this.name = name;

		// Add links
	}
}

class Switch {
	constructor(name) {
		this.name = name;

		// Add ports
	}
}