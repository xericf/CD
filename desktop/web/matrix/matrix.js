
// un comment this and comment out the other bit using /* ... */ to get all the chinese and random unicode charactrs and stuff

$(document).ready(function(){
	var random;
	var html = "";
	$("#hello").on("click",function(){
		setInterval(function(){
		random = String.fromCharCode(Math.floor(Math.random() * 10000));
		html += random;
		$("#meme").html(html);
		}, 100);
	});
});





// they call us hacker man
/*
var dank;
var i = 0;
setInterval(function(){
dank =Math.round(Math.random());
if(i > 5){
dank = " ";
i = 0;
}
i++;
html += dank;
$("#meme").html(html)
}, 20);

*/
