/* VARIABLES */

// Cache
var componentsList = new Array();

// Counters
var componentsCounter = 0;
var layersCounter = 0;
var protocolsCounter = 0;
var interfacesCounter = 0;

// Components connection
	// Flags
	var currentlyLinkingInterfaces = false;

	// Cache
	var sourceInterface = null;
	var destinationInterface = null;

// GUI
	// Shortcuts
	var shortcutAddHost = $( "#shortcutAddHost" );
	var shortcutAddHub = $( "#shortcutAddHub" );
	var shortcutAddSwitch = $( "#shortcutAddSwitch" );
	var shortcutAddRouter = $( "#shortcutAddRouter" );

	// Sandbox
	var sandboxDiv = $( "#sandbox" );

	// Data sender
	var dataSender = new DataSender('#sandbox');

	// Data visualizer
	var dataInformationsDiv = $('#dataInformations');
	var dataDiv = $('#data');
	var simulationControlsDiv = $('#simulationControls');


/* CALLS */

window.onresize = sandboxResize;

createProtocolShortcuts();

var simulation = new Simulation();

sandboxResize();