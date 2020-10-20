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
}

function addHub() {
	console.log("new hub");
}

function addSwitch() {
	console.log("new switch");
}