import React from 'react';
import './GridCell.scss'

export type GridCellType = {
  isAlive: boolean
}

const GridCell = ({isAlive}: GridCellType) => {
  return (
    <div className={["grid-cell", isAlive ? "grid-cell--alive" : ''].join(' ')}>
    </div>
  );
};

export default React.memo(GridCell);