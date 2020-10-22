// Make all the components draggable
$('.component').draggable({
	containment: "#sandbox",
	scroll: false,
	cursor: "move"
});

$('#draggable-containment').draggable({
  containment: '.draggable-container',
});

class Host {
	constructor(name) {
		this.name = name;

		// Physical address
		
		// Add IP address

		// Add mask

		// Add interfaces
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