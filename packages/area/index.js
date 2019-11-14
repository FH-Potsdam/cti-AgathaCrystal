/**
 * @todo change size of area on mouseOver
 * @todo change rotation of area on mouseOver
 * @todo draw area from center not upper left corner
 * @todo do something on click for the area
 */

//########################
let wasRotated = false;
let transX = 0;
let transY = 0;
//########################

let lastOver;



let x = 0;
let canvas = undefined;
const step = 25;
const areas = [];
function setup() {
  canvas = createCanvas(500, 500);
  canvas.parent("sketch");
  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      areas.push(new Area(x, y, step, step));
    }
  }
  //noStroke();
}

function draw() {
  console.log("redraw all areas")
  for (const item of areas) {
    item.update(mouseX, mouseY);
    item.display();
  }

  // if (lastOver) {
  //   lastOver.display();
  // }
}

function Area(x, y, w, h) {
  if (!(this instanceof Area)) {
    throw new TypeError(
      "Area can not be called as a function. Create an instance by calling new Area(x,y,w,h)",
    );
  }
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.isOver = false;

  this.areaColor = "#FFFFFF";
  this.rotationAngle = 0;


  this.update = function (mX, mY) {
    if (
      mX > this.x &&
      mX < this.x + this.w &&
      mY > this.y &&
      mY < this.y + this.h
    ) {
      this.isOver = true;
      lastOver = this;
    } else {
      this.isOver = false;
    }
  };


  // this.display = function () {
  //   if (this.isOver === true) {
  //     fill("#ff6347");

      
  //   } else {
  //     fill(this.areaColor);

  //   }
  //   if (this.isOver) {
     
  //     rect(this.x, this.y, this.w * 2, this.h * 2);
  //   } else {
  //     rect(this.x, this.y, this.w, this.h);
  //   }
  // };


  this.display = function () {


    if (this.isOver === true) {
      transX = (this.w / 2) + x;
      transY = (this.h / 2) + y;
  
      fill("#ff6347");
  
      translate(transX, transY); // zum ursprung projezieren (0,0)
      rotate(PI / 3.6); // rotieren
      translate(-transX,-transY); // zurück zur Herkunftsposition projezieren
      wasRotated = true;
  
    } else {
      if (wasRotated) {
        translate(transX, transY); //  zum ursprung projezieren (0,0)
        rotate(-(PI / 3.6)); // "zurück" rotieren
        translate(-(transX),-(transY)); // zurück zur Herkunftsposition projezieren
        wasRotated = false;
      }
      fill("#00ff00");
    }
    stroke("#ffffff");
    rect(this.x, this.y, this.w, this.h);
  };



}


function mouseClicked(event) {
  for (const area of areas) {
    if (mouseX > area.x && mouseX < area.x + area.w &&
      mouseY > area.y && mouseY < area.y + area.h) {
        area.areaColor  = "#000000";
        
    }
  }
}





// function keyPressed() {
//   if (key === "s" || key === "S") {
//     if (canvas === undefined) {
//       throw new Error("Could not find your canvas");
//     }
//     saveCanvas(canvas, "sketch", "png");
//   }
// }
