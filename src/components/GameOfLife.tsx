import { useState, useEffect } from "react";
import Grid, { Critter } from "./Grid";

const ROWS = 20;
const COLS = 30;

function initialiseGrid(rows: number, cols: number): Critter[][] {
  return Array.from({ length: rows }, (): Critter[] => Array(cols).fill(0));
};

function countLiveNeighbors(grid: Critter[][], row: number, col: number): number {
  let count = 0;
  
  type Directions = number[][]
  const directions: Directions = [
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 1],
    [1, 0],
    [-1, 0],
  ];
  
  directions.forEach(([dx, dy]) => {
    const newRow = row + dx;
    const newCol = col + dy;
    if (
      newRow >= 0 && newRow < ROWS &&
      newCol >= 0 && newCol < COLS &&
      grid[newRow][newCol] === 1
    ) {
      count += 1;
    }
  });
  
  return count
}

function nextGeneration(grid: Critter[][]): Critter[][] {
  const newGrid = initialiseGrid(ROWS, COLS);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let liveNeighbors = countLiveNeighbors(grid, row, col);
      
      if (grid[row][col] === 1 && (liveNeighbors === 2 || liveNeighbors === 3)) {
        newGrid[row][col] = 1;
      } else if (grid[row][col] === 0 && liveNeighbors === 3) {
        newGrid[row][col] = 1;
      }
    }
  }

  return newGrid;
};


export default function GameOfLife() {
  
  const [grid, setGrid] = useState(() => initialiseGrid(ROWS, COLS));
  const [isRunning, setIsRunning] = useState(false);

  function toggleCell(row: number, col: number){
    const newGrid = grid.map((rowArr, rowIndex) =>
      rowArr.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? (cell === 1 ? 0 : 1) : cell
      )
    );
    
    setGrid(newGrid);
  };

  const runSimulation = () => {
    setGrid((prevGrid) => nextGeneration(prevGrid));
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(runSimulation, 500);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

   return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Conway's Game of Life</h1>
      <Grid grid={grid} toggleCell={toggleCell} />
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          onClick={() => setGrid(initialiseGrid(ROWS, COLS))}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
