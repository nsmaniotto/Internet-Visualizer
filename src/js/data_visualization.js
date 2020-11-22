class Data {
	constructor(encapsulatorReference, encapsulatorType, specificType) {
		this.encapsulatorReference = encapsulatorReference; // ID of the component/layer/protocol
		this.encapsulatorType = encapsulatorType; // Component, Layer or Protocol
		this.specificType = specificType; // host, switch, ..., application, transport, ..., TCP, UDP, ...

		this.complementaryInformation = null;

		this.header = null;
		this.encapsulatedData = null;
		this.type = null;

		this.isSubSequence = false; // i.e. awaiting or sending a response
	}

	show() {
		var htmlInformation = this.generationInformationHTML();
		var htmlData = this.generationDataHTML();
	    
		dataInformationsDiv.html(htmlInformation);
		dataDiv.html(htmlData);
	}

	generationInformationHTML() {
		var html = 'Information : ' + this.complementaryInformation;

		return html;
	}

	generationDataHTML() {
		var html = $('<div/>', {
			'class': 'row'
		});

		// Initialize shown data type
		var htmlDataType = $('<div/>', {
			'id': 'dataType',
	        'class': 'col ' + this.type
	    });
	    htmlDataType.append(this.type);

	    // Initialize shown header and encapsulated data as a table
	    var htmlDataTable = $('<table/>', {
			'id': 'dataTable',
	        'class': 'col ' + this.type
	    });

	    var htmlDataRow = $('<tr/>', {
	    	'class' : 'dataRow'
	    });
	    var htmlDataHeaderCol = $('<td/>', {
	        'class': 'dataCol header'
	    });
	    htmlDataHeaderCol.append(this.header);
	    var htmlDataEncapsulatedDataCol = $('<td/>', {
	        'class': 'dataCol encapsulatedData'
	    });

	    var shownEncapsulatedData = this.encapsulatedData;

	    if(this.type != null && this.type != 'data') {
	    	shownEncapsulatedData = 'Encapsulated ' + this.encapsulatedData.type;
	    }

	    htmlDataEncapsulatedDataCol.append(shownEncapsulatedData);

	    htmlDataRow.append(htmlDataHeaderCol);
	    htmlDataRow.append(htmlDataEncapsulatedDataCol);
	    htmlDataTable.append(htmlDataRow);


	    html.append(htmlDataType);
	    html.append(htmlDataTable);


		return html;
	}

	drawActiveStyle() {
		// Retrieve element associated to the data and apply active style
		$( "#" + this.encapsulatorReference ).addClass( "active" );
	}
	
	clearActiveStyle() {
		$( "#" + this.encapsulatorReference ).removeClass( "active" );
	}
}


class ComponentData extends Data {
	constructor(encapsulatorReference, specificType) {
		super(encapsulatorReference, 'component', specificType);
	}
}

class LayerData extends Data {
	constructor(encapsulatorReference, specificType) {
		super(encapsulatorReference, 'layer', specificType);
	}
}

class ProtocolData extends Data {
	constructor(encapsulatorReference, specificType) {
		super(encapsulatorReference, 'protocol', specificType);
	}
}