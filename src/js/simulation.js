class Simulation {
	constructor() {
		if(! Simulation.instance){
			Simulation.instance = this;
			this.generateHTML();
			this.datas = null;
			this.isRunning = false;
			this.currentStep = 0;
		}

		return Simulation.instance;
	}

	start(source, destination, message) {
		this.datas = source.generateData(message);

		this.isRunning = true;

		this.show(this.datas);
	}

	show(data) {
		if(data != null) {
			data.show();
			this.currentStep++;
		}

		if(data.encapsulatedData != null && data.type != 'data') {
			var tempEncapsulatedData = data.encapsulatedData;
			setTimeout(function() {
				if(Simulation.instance.isRunning) {
		    		Simulation.instance.show(tempEncapsulatedData);
		    	}
			}, 2000);
		} else {
			// Simulation has ended
			this.isRunning = false;
			this.currentStep = 0;
		}
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

	playPause() {
		// Prevent from changing status when there is no ongoing simulation
		if(this.currentStep != 0) {
			if(this.isRunning) {
				this.isRunning = false;
			} else {
				this.isRunning = true;

				this.start(this.currentStep);
			}
		}
	}
}

var simulation = new Simulation();