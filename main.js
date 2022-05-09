i = "";
var obj = [];
img = "";
stats = "";
function setup() {
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects."
}
function modelLoaded() {
    console.log("model is loaded");
    stats = true;
    objectDetector.detect(img,gotResults);
}
function gotResults(error,results) {
    if (error) {
        console.error(error);
    } 
    console.log(results);
    obj = results;
}
function preload() {
    img = loadImage("dog_cat.jpg");
}
function draw() {
    image(img,0,0,640,420);
    if (stats != "") {
        for (i = 0; i < obj.length; i++) {
            document.getElementById("status").innerHTML="Status: Object detected!";
            fill("#b5f0ff");
            percent = floor(obj[i].confidence*100);
            text(obj[i].label + "" + percent + "%",obj[i].x,obj[i].y);
            noFill();
            stroke("#000000");
            rect(obj[i].x,obj[i].y,obj[i].width,obj[i].height);
        }
    }
}