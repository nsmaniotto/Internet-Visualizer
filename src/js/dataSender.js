class DataSender {
	constructor(parentId) {
		if(! DataSender.instance){
			this.parentId = parentId;

			this.hostsList = new Array();

			this.generateHTML();

			DataSender.instance = this;
		}

		return DataSender.instance;
	}

	generateHTML() {
		// Retrieve div#parentId
		var parent = $(this.parentId);

		if(parent != null) {
			var dataSender = $('<form/>', {
				'id': 'dataSender'
		    });

		    var row = $('<div/>', {
				'class': 'row'
		    });

		    // "Send message" text
		    row.append('<label for="messageInput">Send message</label>');
		    // Message input
		    row.append('<input type="text" id="messageInput" class="form-control" placeholder="ping">');
		    // "from source host" text
		    row.append('<label for="sourceHostsList">from source host</label>');

		    // Source picker
		    var sourceHostsList = $('<select/>', {
				'id': 'sourceHostsList',
				'class': 'form-control'
		    });
		    sourceHostsList.append(this.generateHostsOptionList());
		  	row.append(sourceHostsList);

		  	// "to destination host" text
		  	row.append('<label for="destinationHostsList">to destination host</label>');

		  	// Destination picker
		  	var destinationHostsList = $('<select/>', {
				'id': 'destinationHostsList',
				'class': 'form-control'
		    });
		    destinationHostsList.append(this.generateHostsOptionList());
		    row.append(destinationHostsList);

		    // Start simulation button
		    var startSimulationButton = $('<button/>', {
				'id': 'startSimulationButton',
				'type': 'button',
				'class': 'btn btn-secondary form-control'
		    });
		    startSimulationButton.append('Start simulation');
		    startSimulationButton.click(function() { DataSender.instance.send() });

		    row.append(startSimulationButton);

		    dataSender.append(row);


		    parent.append(dataSender);
		}
	}

	generateHostsOptionList() {
		var hostsOptionList = "";

		this.hostsList.forEach((host, index, array) => {
		    hostsOptionList = hostsOptionList + '<option value="'+index+'">' + host.name + '</option>';
		});
		
		return hostsOptionList;
	}

	addHost(newHost) {
		this.hostsList.push(newHost);

		// Regenerate html destination and source pickers
		this.updatePickers();
	}

	updatePickers() {
		var optionList = this.generateHostsOptionList();

		$('#sourceHostsList').html(optionList);
		$('#destinationHostsList').html(optionList);
	}

	send() {
		var sourcePosition = $('#sourceHostsList').val();
		var destinationPosition = $('#destinationHostsList').val();

		if(sourcePosition != null && destinationPosition != null) {
			var message = $('#messageInput').val();

			if(message == "") {
				message = "ping";
			}

			var source = this.hostsList[sourcePosition];
			var destination = this.hostsList[destinationPosition];

			if(source != null && destination != null && sourcePosition != destinationPosition) {
				simulation.start(source, destination, message);
			} else {
				// ERROR : Invalid or same source and destination
			}
		} else {
			// ERROR : You need to add host before starting a simulation
		}
	}

}