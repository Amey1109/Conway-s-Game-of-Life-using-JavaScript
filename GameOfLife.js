let rows = 20,
  cols = 20;

let play = false;
let grid = createGrid();

function createGrid() {
  let result = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < rows; j++) {
      row.push(false);
    }
    result.push(row);
  }
  return result;
}

//called once at the beginning of the program
function setup() {
  //oscillator
  grid[10][7] = true;
  grid[10][8] = true;
  grid[10][9] = true;

  //Glider
  grid[5][5] = true;
  grid[5][6] = true;
  grid[5][7] = true;
  grid[4][7] = true;
  grid[3][6] = true;

  createCanvas(500, 500);
}

//From Wikipedia
// 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// 2. Any live cell with two or three live neighbours lives on to the next generation.
// 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
// 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function nextGeneration() {
  let newGrid = createGrid();

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      //counts the alive neighbors
      let directions = [
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
      ];
      let aliveNeighbours = 0;

      //checks with each neighbor iterate through each element in direction
      for (d of directions) {
        let neighbourRow = i + d[0];
        let neighbourCol = j + d[1];

        //Checks Weather the negihbour Row and column are in grid or not
        if (
          neighbourRow >= 0 &&
          neighbourCol >= 0 &&
          neighbourRow < rows &&
          neighbourCol < cols
        ) {
          //Checks that if cell is having neighbour or not
          if (grid[neighbourRow][neighbourCol] == true) {
            aliveNeighbours++;
          }
        }
      }
      //decide weather cell is alive or not
      if (grid[i][j] == true) {
        newGrid[i][j] = aliveNeighbours == 2 || aliveNeighbours == 3;
      } else {
        newGrid[i][j] = aliveNeighbours == 3;
      }
    }
  }

  //Change previous grid to the new grid
  grid = newGrid;
}

function draw() {
  background(255);

  //display the grid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j]) {
        fill(0);
        rect(
          (j / cols) * width,
          (i / rows) * height,
          width / cols,
          height / rows
        );
      }
    }
  }

  //horizontal grid lines
  stroke(200);
  for (let i = 0; i <= rows; i++) {
    line(0, (i / rows) * height, height, (i / rows) * height);
  }
  //vertical grid lines
  for (let i = 0; i <= cols; i++) {
    line((i / cols) * width, 0, (i / rows) * width, width);
  }
}
