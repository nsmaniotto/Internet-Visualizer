class Simulation {
	constructor() {
		if(! Simulation.instance){
			Simulation.instance = this;
			this.generateHTML();
		}

		return Simulation.instance;
	}

	start(source, destination, message) {
		var datas = source.generateData(message);

		datas.show();
	}

	generateHTML() {
		var simulationControls = $('#simulationControls');

		var previousButton = $('<button/>', {
			'id': 'simulationControlPrevious',
			'type': 'button',
	        'class': 'btn btn-secondary'
	    });
	    previousButton.html('Previous');
	    simulationControls.append(previousButton);

	    var playPauseButton = $('<button/>', {
			'id': 'simulationControlPlayPause',
			'type': 'button',
	        'class': 'btn btn-secondary'
	    });
	    playPauseButton.html('Play');
	    simulationControls.append(playPauseButton);

	    var nextButton = $('<button/>', {
			'id': 'simulationControlNext',
			'type': 'button',
	        'class': 'btn btn-secondary'
	    });
	    nextButton.html('Next');
	    simulationControls.append(nextButton);
	}
}

var simulation = new Simulation();