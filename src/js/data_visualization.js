var dataInformationsDiv = $('#dataInformations');
var dataDiv = $('#data');
var simulationControlsDiv = $('#simulationControls');

class Data {
	constructor(encapsulatorReference, encapsulatorType, specificType) {
		this.encapsulatorReference = encapsulatorReference; // ID of the component/layer/protocol
		this.encapsulatorType = encapsulatorType; // Component, Layer or Protocol
		this.specificType = specificType; // host, switch, ..., application, transport, ..., TCP, UDP, ...

		this.complementaryInformation = null;

		this.header = null;
		this.encapsulatedData = null;
		this.type = null;
	}

	show() {
		console.log('(' + this.complementaryInformation + ') [' + this.encapsulatorType + '] ' + this.encapsulatorReference + ' (' + this.specificType + ') --> ' + this.header + ' : ' + this.encapsulatedData + ' (' + this.type + ').');

		if(this.encapsulatedData != null && this.encapsulatedData != '' && this.encapsulatedData != 'message') {
			this.encapsulatedData.show();
		}
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