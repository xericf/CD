var c = document.getElementById("mC");
var ctx = c.getContext("2d");


function Game(){
	var h = 480;
	var w = 640;
	var bulletX = 0;
	var bulletY = 0;
	var eBulletX = 0;
	var eBulletY = 0;
var down = false;
var enemyDown = true;
var playerX = w/2;
var playerY = h/1.2;
var addX = 0;
var addY = 0;
var enemyX = w/2;
var enemyY = h/4;
var enemyAddX = 0;
var enemyAddY = 0;
var move = true;
var enemyNewShot = true;
var newShot = true;
var loser = true;
var pick;
var firstTime = true;
var playerScore = 0;
var enemyScore = 0;

function Player(x, y, dead){
	if(dead === true){
 alert("White block hit orange block");
}
else {
	ctx.fillStyle = "Orange";
	ctx.fillRect(x, y, 40, 40);
}
}

function Background(){
ctx.beginPath();
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 640, 480);
ctx.closePath();
}

function Enemy(x, y, dead){
	if(dead === true){
		alert("Orange block hit white block");
}
else {
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillRect(x, y, 40, 40);
	ctx.closePath();
}
}

function FriendBullet(x, y){
	this.x = x;
	this.y = y;

		ctx.beginPath();
		ctx.fillStyle = "orange";
		ctx.arc(this.x, this.y, 4, 0*Math.PI, 2*Math.PI);
		ctx.fill();
		ctx.closePath();
		//collisions

		if(this.x < enemyX + 40 && this.x > enemyX && this.y < enemyY + 40 && this.y > enemyY && firstTime === true){
			pick = "enemy";
			playerScore+=1;
			winner();
		}
}
function EnemyBullet(x, y){
	this.x = x;
	this.y = y;

		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.arc(this.x, this.y, 4, 0*Math.PI, 2*Math.PI);
		ctx.fill();
		ctx.closePath();

		if(this.x < playerX + 40 && this.x > playerX && this.y < playerY + 40 && this.y > playerY && firstTime === true){
			pick = "player";
			enemyScore += 1;
			winner();
		}
	}

function winner(){
	firstTime = false;
	setTimeout(function(){
	firstTime = true;
	}, 100)
	pick == "player" ? Player(0, 0, loser): Enemy(0, 0, loser);

}

function Score(){
	ctx.beginPath()
	ctx.fillStyle = "orange";
	ctx.fillText(playerScore, 20, h/2 + 20, 30);
	ctx.closePath();
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillText(enemyScore, w - 20, h/2 + 20, 30);
	ctx.closePath();
}

function checkCollision(){
if(playerX < 0){
playerX = 600;
}
if(playerX > 600){
playerX = 1;
}
if(playerY < 0){
playerY = 440;
}
if(playerY > 440){
playerY = 0;
}

if(enemyX < 1){
enemyX = 600;
}
if(enemyX > 600){
enemyX = 1;
}
if(enemyY < 0){
enemyY = 440;
}
if(enemyY > 440){
enemyY = 0;
}
//bulletX

}

function Border(){

}

function Update(){

	playerX += addX;
  playerY += addY
  enemyX += enemyAddX;
  enemyY += enemyAddY;

  checkCollision(); // make a little set time out thing for the border and make it not tele
	new Background();
	new Enemy(enemyX, enemyY);
  new Player(playerX, playerY);
new Score();

}



document.addEventListener("keydown", function(event){
//enemy
if(event.keyCode == 68){
enemyAddX = 5;
enemyDown = true;
}
if(event.keyCode == 65){
enemyAddX = -5;
enemyDown = true;
}
if(event.keyCode == 83){
enemyAddY = 5;
enemyDown = true;
}
if(event.keyCode == 87){
enemyAddY = -5;
enemyDown = true;
}
// player keyboard
if(event.keyCode == 39){
addX = 5;
down = true;
}
if(event.keyCode == 37){
addX = -5;
down = true;
}
if(event.keyCode == 40){
addY = 5;
down = true;
}
if(event.keyCode == 38){
addY = -5;
down = true;
}

});

document.addEventListener("keyup", function(event){
if(down == true){
addX = 0;
addY = 0;
}
if(enemyDown == true){
enemyAddX = 0;
enemyAddY = 0;
}
if(event.keyCode == 13){
	addX = 0;
	addY = 0;

}
});
document.addEventListener("keypress", function(event){
	if(newShot == true){
	if(event.keyCode == 13){
		bulletX = playerX + 20;
		bulletY = playerY;
			newShot = false;
			var bulletTime = setInterval(function(){
				bulletY -= 5;
		new FriendBullet(bulletX, bulletY);
		down = true;
		if(bulletY < 0){
		setTimeout(function(){
			newShot = true;
			clearInterval(bulletTime);
			down = false;
		}, 1);
	}
	}, 1);
}


	}

	if(event.keyCode === 32){
if(enemyNewShot === true){
	enemyNewShot = false;
			eBulletX = enemyX + 20;
			eBulletY = enemyY + 40;
				var eBulletTime = setInterval(function(){
					eBulletY += 5;
			new EnemyBullet(eBulletX, eBulletY);
			enemyDown = true;
			if(eBulletY > 480){
			setTimeout(function(){
				clearInterval(eBulletTime);
				enemyDown = false;
				enemyNewShot = true;
			}, 1);
	}
}, 1);
}

}
});

setInterval(function(){
new Update();
}, 10);

}

Game();
