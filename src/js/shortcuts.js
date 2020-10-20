// Define shortcuts' behaviour
var sandboxDiv = $( "#sanbox" );

var shortcutAddHost = $( "#shortcutAddHost" );
var shortcutAddHub = $( "#shortcutAddHub" );
var shortcutAddSwitch = $( "#shortcutAddSwitch" );

shortcutAddHost.click(function() { addHost() });

shortcutAddHub.click(function() { addHub() });

shortcutAddSwitch.click(function() { addSwitch() });

function addHost() {
	console.log("new host");
	// Ask for the host name
	var hostName = null;

	while(hostName == null || hostName == "")
	{
		hostName = prompt("Please name the new host", "unnamed_host");
	}

	// Create a new host instance with the name


	// Add the new host instance to the sandbox

}

function addHub() {
	console.log("new hub");
}

function addSwitch() {
	console.log("new switch");
}