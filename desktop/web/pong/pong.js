var c = document.getElementById("mC");
var ctx = c.getContext("2d");

var enemyScore = 0;
var playerScore = 0;

function Game(){

var paddleX = 35;
var paddleY = 25;

var ballX = 640;
var ballY = 360;

if(Math.random() < 0.5){
var ballDirectionX = 3;
}
else{
	var ballDirectionX = -3;
}

if(Math.random() < 0.5){
var ballDirectionY = 3;
}
else {
	var ballDirectionY = -3;
}

var enemyX = (1280 - 75);
var enemyY = 0;
var enemyYDirection = 0;

var paddleDirection = 0; //for paddles mate

function Player1(x, y) {

	this.x = x;
	this.y = y;


	ctx.fillStyle = "white";
	ctx.fillRect(this.x, this.y, 35, 155);

}

function Ball(x, y){
	this.x = x;
	this.y = y;
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.arc(this.x, this.y, 30, 0*Math.PI, 2*Math.PI);
	ctx.fill();
	ctx.closePath();
}

function Player2(x, y){
	this.x = x;
	this.y = y;

	ctx.fillStyle = "grey";
	ctx.fillRect(this.x, this.y, 35, 155);
}
function Background(){
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 1280, 720);
}

function checkWallCollision(){
	//for the ball
	if(ballX < 30){
		ballDirectionX = 0;
		ballDirectionY = 0;
	}
	if(ballX > (1280 - 30)){
		ballDirectionY = 0;
		ballDirectionX = 0;
	}
	if(ballY > 690){
		ballDirectionY = -3;
	}
	if(ballY < 30){
		ballDirectionY = 3;
	}

	//for the paddle

	if(paddleY < 0){
		paddleDirection = 5;
	}
	if(paddleY > 565){
		paddleDirection = -5;
	}

//enemy
/*
	if(enemyY < 0){
		enemyYDirection = 5;
	}
	if(enemyY > 565){
		enemyYDirection = -5;
	}
	*/
}


function checkPlayerMovement(){

	document.addEventListener('keydown', function(event) {
    if(event.keyCode == 40) {
        paddleDirection = 5;
    }
    if(event.keyCode == 38) {
        paddleDirection = -5;
    }
});

}

function checkPlayerCollision(){
	if((paddleX + 45) >= ballX && ballY <= (paddleY + 155) && ballY >= paddleY){
		ballDirectionX = 3;
		ballDirectionY = 3;
	}
else if((enemyX - 35) <= ballX && ballY <= (enemyY + 155) && ballY >= enemyY){
		ballDirectionY = -3;
		ballDirectionX = -3;
	}


}

function checkWinner(){

	if(ballX < paddleX){
		enemyScore += 1;
		ballX = 640;
		ballY = 360;
	}
	if(ballX > enemyX){
		playerScore += 1;
		ballX = 640;
		bakkY = 360;
	}

}

function aI(){
	if(enemyY < 0){
		enemyYDirection = 5;
	}
	else if(enemyY > 565){
		enemyYDirection = -5;
	}
	else {
	if(enemyY < ballY){
		enemyYDirection = 5;
	}
	if(enemyY > ballY){
		enemyYDirection = -5;
	}
}
}

function score(){
	ctx.beginPath();
	ctx.fillStyle = "orange";

	ctx.fillText(enemyScore, 700, 50);
	ctx.closePath();
	ctx.beginPath();
	ctx.fillStyle = "purple";

	ctx.fillText(playerScore, 600, 50);
	ctx.closePath();

}

function Update(){

	//PaddleX is 25;
	paddleY += paddleDirection;

	enemyY += enemyYDirection;

	ballX += ballDirectionX;
	ballY += ballDirectionY;

	new Background();
	score();
	new Player1(paddleX, paddleY);
	new Player2(enemyX, enemyY); // problem might occur if the ball is ripping on the side and that memer is chasing after it
	new Ball(ballX, ballY);
	checkWallCollision();
	checkPlayerCollision();
	checkWinner();
	aI();// fix this meme hole
}
checkPlayerMovement();


// this is the updater
setInterval(function(){
	new Update();

}, 15);

}

Game();

//started working 7:15 stopped 8.27
