function setup() {
  createCanvas(600, 600);
  background(31, 127, 255);
  rect(50, 50, 500, 500);
  for (let x = 100; x < 550; x += 50) {
    for (let y = 100; y < 550; y += 50) {
      ellipse(x, y, 5);
      randomDrawLine(x, y);
    }
  }
}

function draw() {

}

function randomDrawLine(startX, startY) {
  const f = Math.floor(Math.random() * 4);
  if (f === 0) { line(startX, startY, startX, startY - 50); }
  else if (f === 1) { line(startX, startY, startX + 50, startY); }
  else if (f === 2) { line(startX, startY, startX, startY + 50); }
  else { line(startX, startY, startX - 50, startY); }
}