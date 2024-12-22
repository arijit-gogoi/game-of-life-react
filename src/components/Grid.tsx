import Cell from "./Cell";

export enum Critter {
  NotAlive = 0, 
  Alive = 1
}

export default function Grid({ grid, toggleCell }: 
  { 
    grid: Critter[][];
    toggleCell: (row: number, col: number) => void 
   }){
  return (
    <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${grid[0].length}, 1.5rem)` }}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            isAlive={cell === 1}
            toggleCell={() => toggleCell(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

