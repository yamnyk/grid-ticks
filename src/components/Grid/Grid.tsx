import React from 'react';

import GridCell from "../GridCell/GridCell";
import './Grid.scss'

type GridType = {
  matrix: Array<Array<number>>
}

const Grid = ({matrix}: GridType) => {
  const size = matrix?.[0]?.length || 0
  const mappedCells = size > 0 && matrix
    .map((row, y) => row
      .map((cell, x) => <GridCell key={`${x}-${y}`} isAlive={cell === 1}/>))

  const gridConfig = {
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gridAutoRows: '5px',
    gap: '5px'
  }

  return (
    <div className="grid" style={gridConfig}>
      {mappedCells}
    </div>
  );
};

export default Grid;