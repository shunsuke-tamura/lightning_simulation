let flame = 0
let maze

function setup() {
  createCanvas(600, 600)
  background(31, 127, 255)
  stroke(255, 255, 255)
  fill(0, 0, 0)
}

function draw() {
  if (flame % 120 === 0 && flame / 120 < 5) {
    maze = new Maze((flame / 120 + 1) * 10)
    maze.generateMaze()
    maze.BFS()
    maze.drawMaze()
  }
  flame += 1
}

class Maze {
  constructor(lineNum) {
    this.increase = 500 / lineNum
    this.lineNum = lineNum
    this.cells = Array.from(Array(lineNum * lineNum)).map((_, i) =>
      i === Math.floor(lineNum / 2)
        ? new Cell(i, this.increase, 50 + (i % lineNum) * this.increase, 50 + Math.floor(i / lineNum) * this.increase, 1)
        : new Cell(i, this.increase, 50 + (i % lineNum) * this.increase, 50 + Math.floor(i / lineNum) * this.increase, 0)
    )
  }

  // 棒倒し法で迷路生成
  generateMaze() {
    for (let y = 0; 50 + (y + 1) * this.increase < 550; y++) {
      for (let x = 1; 50 + x * this.increase < 550; x++) {
        const f = Math.floor(Math.random() * 4)
        if (f === 0) {
          // 上に伸ばす
          this.cells[x + (y * this.lineNum)].leftWall = 1
          this.cells[(x - 1) + (y * this.lineNum)].rightWall = 1
        }
        else if (f === 1) {
          // 右に伸ばす 
          this.cells[x + (y * this.lineNum)].bottomWall = 1
          this.cells[x + ((y + 1) * this.lineNum)].topWall = 1
        }
        else if (f === 2) {
          // 下に伸ばす 
          this.cells[x + ((y + 1) * this.lineNum)].leftWall = 1
          this.cells[(x - 1) + ((y + 1) * this.lineNum)].rightWall = 1
        }
        else {
          // 左に伸ばす
          this.cells[(x - 1) + (y * this.lineNum)].bottomWall = 1
          this.cells[(x - 1) + ((y + 1) * this.lineNum)].topWall = 1
        }
      }
    }

    // 四方の枠を設定
    for (let i = 0; i < this.lineNum; i ++) { 
      // 上
      this.cells[i].topWall = 1
      // 右
      this.cells[(i + 1) * this.lineNum - 1].rightWall = 1
      // 下
      this.cells[(this.lineNum - 1) * this.lineNum + i].bottomWall = 1
      // 左
      this.cells[i * this.lineNum].leftWall = 1
    }
  }

  drawMaze() {
    clear()
    setup()
    for (const cell of this.cells) {
      cell.drawWalls()
      cell.fillCell([255, 255, 255 , cell.step + 1])
      cell.start === 1 && cell.fillCell([255, 255, 255 , 255])
    }
  }

  // 幅有線探索
  BFS() {
    let tempCells = [...this.cells]
    let currentCell = tempCells.splice(Math.floor(this.lineNum / 2), 1, null), nextCell, currentStep = 0
    let queue = [currentCell[0]]
    this.cells[Math.floor(this.lineNum / 2)].step = 0
    while (queue.length !== 0) {
      currentStep++
      console.log("queue:", queue);
      currentCell = queue.shift()
      if (currentCell.topWall === 0) {
        nextCell = tempCells.splice(Math.floor(currentCell.id / this.lineNum - 1) * this.lineNum + currentCell.id % this.lineNum, 1, null)
        if (nextCell[0]) {
          console.log(nextCell);
          queue.push(nextCell[0])
          this.cells[currentCell.id].step = currentStep
        }
      }
      if (currentCell.rightWall === 0) {
        nextCell = tempCells.splice(currentCell.id + 1, 1, null)
        if (nextCell[0]) {
          console.log(nextCell);
          queue.push(nextCell[0])
          this.cells[currentCell.id].step = currentStep
        }
      }
      if (currentCell.bottomWall === 0) {
        nextCell = tempCells.splice(Math.floor(currentCell.id / this.lineNum + 1) * this.lineNum + currentCell.id % this.lineNum, 1, null)
        if (nextCell[0]) {
          console.log(nextCell);
          queue.push(nextCell[0])
          this.cells[currentCell.id].step = currentStep
        }
      }
      if (currentCell.leftWall === 0) {
        nextCell = tempCells.splice(currentCell.id - 1, 1, null)
        if (nextCell[0]) {
          console.log(nextCell);
          queue.push(nextCell[0])
          this.cells[currentCell.id].step = currentStep
        }
      }
      if ((this.lineNum - 1) * this.lineNum <= currentCell.id && currentCell.id <= this.lineNum * this.lineNum - 1) {
        break
      }
    }
  }
}

class Cell {
  constructor(id, size, positionX, positionY, start) {
    this.id = id
    this.size = size
    this.position = [positionX, positionY]
    this.topWall = 0;
    this.rightWall = 0;
    this.bottomWall = 0;
    this.leftWall = 0;
    this.start = start;
    this.step = -1;
  }

  drawWalls() {
    this.topWall === 1 && line(this.position[0], this.position[1], this.position[0] + this.size, this.position[1])
    this.rightWall === 1 && line(this.position[0] + this.size, this.position[1], this.position[0] + this.size, this.position[1] + this.size)
    this.bottomWall === 1 && line(this.position[0], this.position[1] + this.size, this.position[0] + this.size, this.position[1] + this.size)
    this.leftWall === 1 && line(this.position[0], this.position[1], this.position[0], this.position[1] + this.size)
  }

  fillCell(color) {
    noStroke()
    fill(color)
    rect(this.position[0], this.position[1], this.size, this.size);
    stroke(255, 255, 255)
  }
}