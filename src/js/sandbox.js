$('#sandbox').droppable({
	accept: ".component"
});

function sandboxResize() {
 	//var htmlHeight = $('html').height();
 	//var htmlWidth = $('html').width();
 	
	var bodyHeight = $('body').height();
	var bodyWidth = $('body').width();
	var navHeight = $('#navbarDiv').height();

	$('#sandbox').height(bodyHeight - navHeight - 10);
}

window.onresize = sandboxResize;

sandboxResize();