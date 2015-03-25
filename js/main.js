// Shorthand syntax instead of jQuery
var $ = document.querySelectorAll.bind(document);
Element.prototype.on = Element.prototype.addEventListener;

$('#message')[0].focus();


var chappie = new Chappie();
chappie.answer = function(answer, type){
	if(type === undefined) {
		type = 'response';
	}
	$('#conversation')[0].innerHTML = '<p class="' + type + '">' + answer + '</p>' + $('#conversation')[0].innerHTML;
}

// Do not reload the page when submitted
$('#form')[0].on('submit', ask);
function ask (event){
	event.preventDefault();
	chappie.ask($('#message')[0].value);
	$('#message')[0].value = '';
}