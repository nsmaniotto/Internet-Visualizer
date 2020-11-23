class Simulation {
	constructor() {
		if(! Simulation.instance){
			Simulation.instance = this;
			this.generateHTML();
			this.datas = new Array();
			this.isRunning = false;
			this.currentData = null;
			this.currentStep = 0;
		}

		return Simulation.instance;
	}

	start(source, destination, message) {
		source.generateData(message);

		this.isRunning = true;
		$('#simulationControlPlayPause').html('Pause');

		this.show();
	}

	show() {
		if(this.datas != null) {
			this.currentData = this.datas[this.currentStep];
			this.currentData.show();
			this.currentStep++;
		}

		if(this.currentStep < this.datas.length) {
			setTimeout(function() {
				if(Simulation.instance.isRunning) {
		    		Simulation.instance.show();
		    	}
			}, 2000);
		} else {
			// Simulation has ended
			this.datas = new Array();
			this.isRunning = false;
			this.currentData = null;
			this.currentStep = 0;
			$('#simulationControlPlayPause').html('Play');
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
	    previousButton.click(function() { Simulation.instance.previous() });
	    simulationControls.append(previousButton);

	    var playPauseButton = $('<button/>', {
			'id': 'simulationControlPlayPause',
			'type': 'button',
	        'class': 'btn btn-secondary'
	    });
	    playPauseButton.html('Play');
	    playPauseButton.click(function() { Simulation.instance.playPause() });
	    simulationControls.append(playPauseButton);

	    var nextButton = $('<button/>', {
			'id': 'simulationControlNext',
			'type': 'button',
	        'class': 'btn btn-secondary'
	    });
	    nextButton.html('Next');
	    nextButton.click(function() { Simulation.instance.next() });
	    simulationControls.append(nextButton);
	}

	playPause() {
		// Prevent from changing status when there is no ongoing simulation
		if(this.currentStep != 0) {
			if(this.isRunning) {
				this.pause();
			} else {
				this.unpause();
			}
		}
	}

	pause() {
		this.isRunning = false;
		$('#simulationControlPlayPause').html('Play');
	}

	unpause() {
		$('#simulationControlPlayPause').html('Pause');

		if(this.currentData != null)
		{
			this.isRunning = true;
			this.show();
		}
	}

	previous() {
		if(this.currentData != null && this.currentStep > 1)
		{
			this.currentStep -= 2;

			this.show();
			this.pause();
		}
	}

	next() {
		if(this.currentData != null) {
			this.show();
			this.pause();
		}
	}
}

var simulation = new Simulation();