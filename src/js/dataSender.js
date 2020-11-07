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
		    row.append('<button id="sendDataButton" type="button" class="btn btn-secondary form-control">Start simulation</button>');

		    dataSender.append(row);


		    parent.append(dataSender);
		}
	}

	generateHostsOptionList() {
		var hostsOptionList = "";

		this.hostsList.forEach(host => hostsOptionList = hostsOptionList + '<option>' + host.name + '</option>');
		
		return hostsOptionList;
	}

	addNewComponentToHosts() {

	}

	removeComponentFromHosts() {

	}

}

var dataSender = new DataSender('#sandbox');