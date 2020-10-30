// Define shortcuts' behaviour
var sandboxDiv = $( "#sandbox" );

var shortcutAddHost = $( "#shortcutAddHost" );
var shortcutAddHub = $( "#shortcutAddHub" );
var shortcutAddSwitch = $( "#shortcutAddSwitch" );
var shortcutAddRouter = $( "#shortcutAddRouter" );

shortcutAddHost.click(function() { addHost() });

shortcutAddHub.click(function() { addHub() });

shortcutAddSwitch.click(function() { addSwitch() });

shortcutAddRouter.click(function() { addRouter() });

function addHost() {
	// Ask for the host name
	var hostName = null;

	while(hostName == null || hostName == "")
	{
		hostName = prompt("Please name the new host", "unnamed_host");
	}

	// Create a new host instance with the name
	var newHost = new Host(hostName);
}

function addHub() {
	var hubName = null;

	while(hubName == null || hubName == "")
	{
		hubName = prompt("Please name the new hub", "unnamed_hub");
	}

	// Create a new hub instance with the name
	var newHub = new Hub(hubName);
}

function addSwitch() {
	var switchName = null;

	while(switchName == null || switchName == "")
	{
		switchName = prompt("Please name the new switch", "unnamed_switch");
	}

	// Create a new switch instance with the name
	var newSwitch = new Switch(switchName);
}

function addRouter() {
	var routerName = null;

	while(routerName == null || routerName == "")
	{
		routerName = prompt("Please name the new router", "unnamed_router");
	}

	// Create a new switch instance with the name
	var newRouter = new Router(routerName);
}

function createProtocolShortcuts() {
	createTCPShortcut();
	createIPShortcut();
}

function createTCPShortcut () {
	var tempProtocolHTML = $('<div/>', {
	        'class': 'shortcut protocol TCPProtocol d-inline-block'
	    });

	tempProtocolHTML.append("TCP");

	tempProtocolHTML.draggable({
		revert: "invalid",
		containment: "#sandbox",
		scroll: false,
		cursor: "move",
		start: createTCPShortcut,
		stop: function() {
			tempProtocolHTML.remove();
		}
	});

	$('#shortcutAddProtocolTCP').append(tempProtocolHTML);
}

function createIPShortcut () {
	var tempProtocolHTML = $('<div/>', {
	        'class': 'shortcut protocol IPProtocol d-inline-block'
	    });

	tempProtocolHTML.append("IP");

	tempProtocolHTML.draggable({
		revert: "invalid",
		containment: "#sandbox",
		scroll: false,
		cursor: "move",
		start: createIPShortcut,
		stop: function() {
			tempProtocolHTML.remove();
		}
	});

	$('#shortcutAddProtocolIP').append(tempProtocolHTML);
}

createProtocolShortcuts();