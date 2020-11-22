var componentsList = new Array();

var componentsCounter = 0;

var dataInformationsDiv = $('#dataInformations');
var dataDiv = $('#data');
var simulationControlsDiv = $('#simulationControls');


var dataSender = new DataSender('#sandbox');

var interfacesCounter = 0;
var currentlyLinkingInterfaces = false;
var sourceInterface = null;
var destinationInterface = null;

var layersCounter = 0;

var protocolsCounter = 0;



window.onresize = sandboxResize;

sandboxResize();

var simulation = new Simulation();