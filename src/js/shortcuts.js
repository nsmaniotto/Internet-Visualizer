// Define shortcuts' behaviour
var sandboxDiv = $( "#sandbox" );

var shortcutAddHost = $( "#shortcutAddHost" );
var shortcutAddHub = $( "#shortcutAddHub" );
var shortcutAddSwitch = $( "#shortcutAddSwitch" );

shortcutAddHost.click(function() { addHost() });

shortcutAddHub.click(function() { addHub() });

shortcutAddSwitch.click(function() { addSwitch() });

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