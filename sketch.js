let flame = 0
let maze

function setup() {
  createCanvas(600, 600)
  background(31, 127, 255)
  rect(50, 50, 500, 500)
}

function draw() {
  if (flame % 120 === 0 && flame / 120 < 5) {
    maze = new Maze((flame / 120 + 1) * 10)
    maze.generateMaze()
  }
  flame += 1
}

class Maze {
  constructor(lineNum) {
    this.lineNum = lineNum
    clear()
    createCanvas(600, 600)
    background(31, 127, 255)
    rect(50, 50, 500, 500)
  }

  // 棒倒し法で迷路生成
  generateMaze() {
    const increase = 500 / this.lineNum
    for (let y = 50 + increase; y < 550; y += increase) {
      for (let x = 50 + increase; x < 550; x += increase) {
        const f = Math.floor(Math.random() * 4)
        if (f === 0) { line(x, y, x, y - increase) }
        else if (f === 1) { line(x, y, x + increase, y) }
        else if (f === 2) { line(x, y, x, y + increase) }
        else { line(x, y, x - increase, y) }
      }
    }
  }
}
