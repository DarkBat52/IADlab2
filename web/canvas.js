/* var canvas = document.getElementById("mCanvas");
var ctx = canvas.getContext("2d");
var canvasSize = 400;

canvas.width = canvasSize;
canvas.height = canvasSize;

ctx.fillStyle = "#ff6100";

//Drawing the rectangle
ctx.fillRect(canvasSize*0.1,canvasSize*0.5,canvasSize*0.4,canvasSize*0.4);

//Drawing the quarter of a circle
ctx.beginPath();
ctx.arc(canvasSize*0.5,canvasSize*0.5,canvasSize*0.2,Math.PI,1.5*Math.PI);
ctx.lineTo(canvasSize*0.5,canvasSize*0.5);
ctx.lineTo(canvasSize*0.1,canvasSize*0.5);
ctx.fill();

//Drawing the triangle
ctx.beginPath();
ctx.moveTo(canvasSize*0.5,canvasSize*0.5);
ctx.lineTo(canvasSize*0.9,canvasSize*0.5);
ctx.lineTo(canvasSize*0.5,canvasSize*0.3);
ctx.fill();

//Drawing the coordinates
ctx.beginPath();
ctx.fillStyle = "#000000";

ctx.moveTo(canvasSize*0.5,canvasSize*0.05);
ctx.lineTo(canvasSize*0.5,canvasSize*0.95);
ctx.moveTo(canvasSize*0.05,canvasSize*0.5);
ctx.lineTo(canvasSize*0.95,canvasSize*0.5);

ctx.moveTo(canvasSize*0.5,canvasSize*0.05);
ctx.lineTo(canvasSize*0.5125,canvasSize*0.075);
ctx.moveTo(canvasSize*0.5,canvasSize*0.05);
ctx.lineTo(canvasSize*0.4875,canvasSize*0.075);

ctx.moveTo(canvasSize*0.95,canvasSize*0.5);
ctx.lineTo(canvasSize*0.925,canvasSize*0.4875);
ctx.moveTo(canvasSize*0.95,canvasSize*0.5);
ctx.lineTo(canvasSize*0.925,canvasSize*0.5125);

ctx.moveTo(canvasSize*0.495,canvasSize*0.1);
ctx.lineTo(canvasSize*0.505,canvasSize*0.1);
ctx.moveTo(canvasSize*0.495,canvasSize*0.3);
ctx.lineTo(canvasSize*0.505,canvasSize*0.3);
ctx.moveTo(canvasSize*0.495,canvasSize*0.7);
ctx.lineTo(canvasSize*0.505,canvasSize*0.7);
ctx.moveTo(canvasSize*0.495,canvasSize*0.9);
ctx.lineTo(canvasSize*0.505,canvasSize*0.9);

ctx.moveTo(canvasSize*0.1,canvasSize*0.495);
ctx.lineTo(canvasSize*0.1,canvasSize*0.505);
ctx.moveTo(canvasSize*0.3,canvasSize*0.495);
ctx.lineTo(canvasSize*0.3,canvasSize*0.505);
ctx.moveTo(canvasSize*0.7,canvasSize*0.495);
ctx.lineTo(canvasSize*0.7,canvasSize*0.505);
ctx.moveTo(canvasSize*0.9,canvasSize*0.495);
ctx.lineTo(canvasSize*0.9,canvasSize*0.505);


//Drawing necessary text data
ctx.font = "15px Arial";
ctx.fillText("Y", canvasSize*0.5125,canvasSize*0.05);
ctx.fillText("X",canvasSize*0.95,canvasSize*0.4875);

ctx.fillText("R", canvasSize*0.5125,canvasSize*0.1125);
ctx.fillText("R/2",canvasSize*0.5125,canvasSize*0.3125);
ctx.fillText("R", canvasSize*0.8875,canvasSize*0.4875);
ctx.fillText("R/2",canvasSize*0.6875,canvasSize*0.4875);
ctx.fillText("-R", canvasSize*0.5125,canvasSize*0.9125);
ctx.fillText("-R/2",canvasSize*0.5125,canvasSize*0.7125);
ctx.fillText("-R", canvasSize*0.0875,canvasSize*0.4875);
ctx.fillText("-R/2",canvasSize*0.2875,canvasSize*0.4875);

ctx.stroke(); */





var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var canvasSize = 400;
var R = (canvasSize-80)/2;

//Necessary numbers to draw shapes on canvas
var rectX = -1;
var rectY = 1;
var circleR = 0.5;
var circleQ = 4;
var trA = 0.5;
var trB = 1;

canvas.addEventListener('click',doPoint, true);

//Uses ajax to check if clicked point is in area or not
function doPoint(evt){
    //document.getElementById("CanvasLine").innerHTML = "sending data...";
    if (!CheckR()) return;
    var x = evt.clientX - canvas.getBoundingClientRect().left+0.5;
    var y = evt.clientY - canvas.getBoundingClientRect().top;

    var r = document.getElementById("R").value;
    x = (x - canvasSize/2)/R*r;
    y = (-y  + canvasSize/2)/R*r;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            updateData(this);
        }
    };
    xhr.open("POST","controllerservlet",true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("X="+x+"&Y="+y+"&R="+r+"&req=async_check");


}

function updateData(xhr){

    var xml = xhr.responseXML;
    var x = xml.getElementsByTagName("X")[0].childNodes[0].nodeValue;
    var y = xml.getElementsByTagName("Y")[0].childNodes[0].nodeValue;
    var r = xml.getElementsByTagName("R")[0].childNodes[0].nodeValue;
    var res = xml.getElementsByTagName("RES")[0].childNodes[0].nodeValue;

    document.getElementById("TD").innerHTML = "<tr class=\"Row\"><td>"+x+"</td><td>"+y+"</td><td>"+r+"</td><td>"+res+"</td></tr>" + document.getElementById("TD").innerHTML;
    drawPoint(x,y,res);

}

/*draws a point converting x and y, from TableData Coordinates into points on canvas
 * if bGreen == "true" the point is green
*/
function drawPoint(x,y,bGreen){
    if (!CheckR()) return;
    if (bGreen == "true" || bGreen == "green")
        ctx.fillStyle = "#b2ff24";
    else ctx.fillStyle = "#ff2e00";
    var r = document.getElementById("R").value;
    x = x*R/r + canvasSize/2;
    y = canvasSize/2 - y*R/r;
    ctx.beginPath();
    ctx.arc(x,y,3,0,2*Math.PI);
    ctx.fill();
}

function getPlane(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST","controllerservlet",true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            var xml = this.responseXML;
            rectX = xml.getElementsByTagName("RECTX")[0].childNodes[0].nodeValue;
            rectY = xml.getElementsByTagName("RECTY")[0].childNodes[0].nodeValue;
            circleR = xml.getElementsByTagName("CR")[0].childNodes[0].nodeValue;
            circleQ = xml.getElementsByTagName("CQ")[0].childNodes[0].nodeValue;
            trA = xml.getElementsByTagName("TRA")[0].childNodes[0].nodeValue;
            trB = xml.getElementsByTagName("TRB")[0].childNodes[0].nodeValue;
            RedrawCanvas();
            reloadData();
        }
    };
    xhr.send("req=get_plane");
}


function RChanged(){
    if (!CheckR()) return;
    RedrawCanvas();
    reloadData();
}

function RedrawCanvas() {
    R = (canvasSize-80)/2;
    var center = canvasSize/2;
    //Clear canvas of any drawings
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var rad = parseFloat(document.getElementById("R").value);

    ctx.fillStyle = "#ff6100";
    //draw rectangle
    ctx.fillRect(center, center, R*rectX, -R*rectY);

    //draw circle sector
    ctx.beginPath();
    var alpha;
    var beta;
    switch (circleQ) {
        case "1":
            alpha = -0.5*Math.PI;
            beta = 0;
            break;
        case "2":
            alpha = -Math.PI;
            beta = -0.5*Math.PI;
            break;
        case "3":
            alpha = -1.5*Math.PI;
            beta = -Math.PI;
            break;
        default:
            alpha = 0;
            beta = 0.5*Math.PI;
    }
    ctx.arc(center, center, R*circleR, alpha, beta);
    ctx.lineTo(center, center);
    ctx.fill();

    //draw triangle
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(center+R*trA, center);
    ctx.lineTo(center, center-R*trB);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#000000";

    ctx.moveTo(center, 20);
    ctx.lineTo(center, 380);
    ctx.moveTo(20, center);
    ctx.lineTo(380, center);

    ctx.moveTo(center, 20);
    ctx.lineTo(center+5, 30);
    ctx.moveTo(center, 20);
    ctx.lineTo(center-5, 30);

    ctx.moveTo(380, center);
    ctx.lineTo(370, 195);
    ctx.moveTo(380, center);
    ctx.lineTo(370, 205);

    ctx.moveTo(198, 40);
    ctx.lineTo(202, 40);
    ctx.moveTo(198, 120);
    ctx.lineTo(202, 120);
    ctx.moveTo(198, 280);
    ctx.lineTo(202, 280);
    ctx.moveTo(198, 360);
    ctx.lineTo(202, 360);

    ctx.moveTo(40, 198);
    ctx.lineTo(40, 202);
    ctx.moveTo(120, 198);
    ctx.lineTo(120, 202);
    ctx.moveTo(280, 198);
    ctx.lineTo(280, 202);
    ctx.moveTo(360, 198);
    ctx.lineTo(360, 202);

    ctx.font = "15px Arial";
    ctx.fillText("Y", 205, 20);
    ctx.fillText("X", 380, 195);
    ctx.fillText((isNaN(rad)?"R":rad), 205, 45);
    ctx.fillText((isNaN(rad)?"R/2":rad/2), center + 5, 125);
    ctx.fillText((isNaN(rad)?"R":rad), 355, 195);
    ctx.fillText((isNaN(rad)?"R/2":rad/2), 275, 195);

    ctx.fillText("-" + (isNaN(rad)?"R":rad), 205, 365);
    ctx.fillText("-" + (isNaN(rad)?"R/2":rad/2), 205, 285);
    ctx.fillText("-" + (isNaN(rad)?"R":rad), 35, 195);
    ctx.fillText("-" + (isNaN(rad)?"R/2":rad/2), 115, 195);

    ctx.stroke();
}