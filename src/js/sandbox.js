$('#sandbox').droppable({
	accept: ".component"
});

function sandboxResize() {
 	//var htmlHeight = $('html').height();
 	//var htmlWidth = $('html').width();
 	
	var bodyHeight = $('body').height();
	var bodyWidth = $('body').width();
	var navHeight = $('#navbarDiv').height();
	var dataVisualizerHeight = $('#dataVisualizer').height();

	$('#sandbox').height(bodyHeight - navHeight - dataVisualizerHeight - 10);
}

window.onresize = sandboxResize;

sandboxResize();