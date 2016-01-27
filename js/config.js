var app = {};

app.config = (function () {
	var canvas = document.getElementById('canvas');
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	window.onresize = function (){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	return {
		canvas: canvas,
		colors: {
			yellow:'#ffff00',
			red: '#ff0000',
			green: '#008000'
		}
	}
})();