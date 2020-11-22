function makeInterfaceClickable(interfaceReference) {
    interfaceReference.html.click(function() {
    	//interfaceReference.interfaceClick();
    	if(currentlyLinkingInterfaces) {
    		// Completely delete current link if it exists
    		if(interfaceReference.link2 != null) {
    			deleteLink(interfaceReference);
    		}

    		destinationInterface = interfaceReference;

    		if(sourceInterface != destinationInterface) {
    			interfaceReference.link2 = sourceInterface;
				sourceInterface.link2 = interfaceReference;

				drawLink(sourceInterface);
    		}

			currentlyLinkingInterfaces = false;
    	} else {
    		// Completely delete current link if it exists
    		if(interfaceReference.link2 != null) {
    			deleteLink(interfaceReference);
    		}

    		currentlyLinkingInterfaces = true;

    		sourceInterface = interfaceReference;
    	}
	});
}

function drawLink(interfaceReference) {
	if(interfaceReference.link2 != null) {
		var link1 = '#' + interfaceReference.link1;
		var link2 = '#' + interfaceReference.link2.link1;

		$().connections({ from: link1, to: link2 });
	}
}

function eraseLink(interfaceReference) {
	if(interfaceReference.link2 != null) {
		var link1 = '#' + interfaceReference.link1;

		$(link1).connections('remove');
	}
}

function deleteLink(interfaceReference) {
	if(interfaceReference.link2 != null) {
		// Erase visible link
		eraseLink(interfaceReference);

		// Remove link2 reference to current link1
		interfaceReference.link2.link2 = null;
	}
}

class Interface {
	constructor(interfaceName) {
		this.name = interfaceName;

		this.html = null;

		this.link1 = this.generateLink();
		this.link2 = null;

		this.generateHTML();

		makeInterfaceClickable(this);
	}

	generateLink() {
		var newLink = 'link' + interfacesCounter;

		interfacesCounter++;

		return newLink;
	}

	generateHTML() {
		this.html = $('<div/>', {
			'id': this.link1,
	        'class': 'col interface ' + this.name
	    });

	    this.html.append( this.name );
	}

	redrawLink() {
		if(this.link2 != null) {
			// Simply erase the link without removing references
			eraseLink(this);
			drawLink(this);
		}
	}
}