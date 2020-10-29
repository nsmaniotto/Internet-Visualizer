var interfacesCounter = 0;
var currentlyLinkingInterfaces = false;
var sourceInterface = null;
var destinationInterface = null;

function makeInterfaceClickable(interfaceReference) {
    interfaceReference.html.click(function() {
    	//interfaceReference.interfaceClick();
    	if(currentlyLinkingInterfaces) {
    		// Delete current link if it exists
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
    		// Delete current link if it exists
    		if(interfaceReference.link2 != null) {
    			deleteLink(interfaceReference);
    		}

    		currentlyLinkingInterfaces = true;

    		sourceInterface = interfaceReference;
    	}
	});
}

function drawLink(interfaceReference) {
	var link1 = '#' + interfaceReference.link1;
	var link2 = '#' + interfaceReference.link2.link1;

	$().connections({ from: link1, to: link2 });
}

function deleteLink(interfaceReference) {
	var link1 = '#' + interfaceReference.link1;
	var link2 = '#' + interfaceReference.link2.link1;

	$(link1).connections('remove');
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
}