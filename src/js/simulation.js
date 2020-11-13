class Simulation {
	constructor() {
		if(! Simulation.instance){
			Simulation.instance = this;
			this.generateHTML();
			this.datas = null;
			this.isRunning = false;
			this.currentData = null;
			this.currentStep = 0;
		}

		return Simulation.instance;
	}

	start(source, destination, message) {
		this.datas = source.generateData(message);

		this.isRunning = true;
		$('#simulationControlPlayPause').html('Pause');

		this.show(this.datas);
	}

	show(data) {
		if(data != null) {
			data.show();
			this.currentData = data;
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
		this.isRunning = true;
		$('#simulationControlPlayPause').html('Pause');

		if(this.currentData != null)
		{
			var data = this.datas;

			for(var i = 1 ; i < this.currentStep; i++) {
				data = data.encapsulatedData;
			}

			this.show(data);
		}
	}

	previous() {
		if(this.datas != null && this.currentStep > 1)
		{
			var data = this.datas;

			for(var i = 0 ; i < this.currentStep - 2; i++) {
				data = data.encapsulatedData;
			}

			this.currentStep -= 2;

			this.show(data);
			this.pause();
		}
	}

	next() {
		
	}
}

var simulation = new Simulation();