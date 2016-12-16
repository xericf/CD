c = document.getElementById("myCanvas");
ctx = c.getContext("2d");


function whichGraph() {
  var radians = 0;
  var circlePlace = 0;
  var confusingSlice = 0;
  var total = 0;
  var input;
  var color;
  var barNumber = 1;
  var firstTime = true;
  var yInterval = Number(prompt("Set the interval for the Y-axis, please only use a number. Under 250 please."));
  if (yInterval === isNaN || yInterval < 1 || yInterval > 250) {
    whichGraph();
  }

  var trackerX = 25;
  var copyX = trackerX;

  var answer = prompt("Type 1 for a Bar Graph and type 2 for a Line Graph or type 3 for a Circle Graph.");

  if (answer == "no"){
    return;
  }
  if (answer !== "1" && answer !== "2" && answer !== null && answer !== "3") {
    whichGraph();
  }



  var type = answer;
  if (type == "1") {

    function BarGraph(x) {

      input = Number(prompt("What is the height of which you want your bar to be? Enter out of 250"));

      color = prompt("What color would you like it as?");
      barNumber += 1;
      this.length = 10;
      this.height = input;
      this.x = x;
      this.y = c.height - this.height;

      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.length, this.height);


      firstTime = false;

      if (firstTime === false) {
        var tryAgain = prompt("want to make a " + barNumber + "th bar? Enter either yes or no").toLowerCase();
        if (tryAgain == "yes" || tryAgain == "y") {

          BarGraph(copyX += 20);

        }
      }
    }
    BarGraph(trackerX);
  }


  if (type == "2") {
    function LineGraph() {

      this.x = Number(prompt("Enter your X starting position for the line graph. under 500 "));
      this.y = Number(prompt("Enter your Y starting position for the line graph. Note the most top of the y-axis is 0 instead of 250."));

      this.endingX = Number(prompt("Enter your ending line on the X-axis under 500"));
      this.endingY = Number(prompt("Enter your ending line on the Y-axis under 250"));

      ctx.beginPath();
      ctx.strokeStyle = prompt("Enter a color for the lines please.");
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.endingX, this.endingY);
      ctx.stroke();
      ctx.closePath();

      ctx.arc(this.endingX, this.endingY, 3, 0, 2 * Math.PI);
      ctx.fill();

      var tryAgain = prompt("Want to make another line? Enter either yes or no").toLowerCase();
      if (tryAgain == "yes" || tryAgain == "y") {
        alert(this.endingX.toString() + this.endingY.toString() + "Remember these numbers, they are your ending X and ending Y positions. Enter them in when I ask the starting positions.");
        LineGraph();
      }
    }
    LineGraph();
  }
  //circle graph optional add a type = 3 if there is circle grpah
  if (type === "3") {
    function CircleGraph() {

      ctx.arc(250, 125, 100, 0, 2 * Math.PI);
      ctx.stroke();

      this.pieSlice = Number(prompt("What percentage would you like your slice to be? They have to be under " + (100 - total)).replace("%", ""));
      circlePlace += this.pieSlice;

      total += this.pieSlice;

      if (total > 100) {
        alert("please let the total be equal to 100 or under 100 for another slice, " + total + "% that is your total percentage right now.");
        total -= this.pieSlice;
        CircleGraph();
      }
      //semi circle, ctx.arc(50, 50, 50, 0, Math.PI)
      //half by drawing line all the way aross
      // c/d = pi
      ctx.beginPath();
      ctx.fillStyle = prompt("What colour would you like it?");
      ctx.moveTo(250, 125);
      ctx.arc(250, 125, 100, radians * Math.PI, circlePlace / 50 * Math.PI);
      ctx.lineTo(250, 125);
      ctx.closePath();
      ctx.fill();

      radians += this.pieSlice / 50;

      if (total < 100) {
        var tryAgain = prompt("would you like to make another slice? Enter yes or no. Your current percentage is at " + total + "%").toLowerCase();

        if (tryAgain === "yes" || tryAgain == "y") {
          CircleGraph();
        }
      }
    }
    CircleGraph();
  }

  var trackInterval = yInterval;
  var interval = 250 / yInterval;
  var otherInterval = 500 / 20;
  //for the y axis
  for (var i = 0; i < interval; i++) {

    ctx.beginPath();
    ctx.moveTo(0, 250 - yInterval);
    ctx.lineTo(6, 250 - yInterval);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeText(yInterval, 7, 250 - yInterval + 4, yInterval);
    yInterval += trackInterval;
  }

  //for the X-axis
  for (var j = 0; j < otherInterval; j++) {
    ctx.beginPath();
    ctx.strokeStyle = "brown";
    ctx.moveTo(trackerX, 250);
    ctx.lineTo(trackerX, 243);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeText(j, trackerX + 2, 247, 10);
    trackerX += 20;
  }

}





whichGraph();
