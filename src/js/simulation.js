class Simulation {
	constructor() {
		if(! Simulation.instance){
			Simulation.instance = this;
		}

		return Simulation.instance;
	}

	start(source, destination, message) {
		console.log(source.name + " -> " + destination.name + " : " + message);
	}

}

var simulation = new Simulation();