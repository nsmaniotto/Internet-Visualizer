class Simulation {
	constructor() {
		if(! Simulation.instance){
			Simulation.instance = this;
		}

		return Simulation.instance;
	}

	start(source, destination, message) {
		var datas = source.generateData(message);

		datas.show();
	}

}

var simulation = new Simulation();