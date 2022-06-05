import React, {useEffect, useState} from 'react';

import Grid from "../Grid/Grid";
import generateGrid from "../../utils/generate-grid";
import makeTick from "../../utils/make-tick";
import useInterval from "../../utils/use-interval";

type GameType = {
  delay: number
}

const Game = ({delay}: GameType) => {
  const [tick, setTick] = useState(-1)
  const [matrix, setMatrix] = useState(generateGrid(0))
  const [end, setEnd] = useState(false)
  const size = matrix?.[0]?.length || false

  const handleAddGrid = () => {
    setMatrix(generateGrid(50))
  }

  const handleStart = () => {
    setTick(0)
  }

  const handleReset = () => {
    setTick(-1)
    setMatrix(generateGrid(0))
    setEnd(false)
  }

  const handleChangeTickEffect = () => {
    if (tick > 0 && size) {
      const {newMatrix, liveCells, hasChanged} = makeTick(matrix)

      if (liveCells === 0 || !hasChanged) {
        setEnd(true)
      } else {
        setMatrix(newMatrix)
      }
    }
  }

  useInterval(() => {
      setTick(prev => prev >= 0 ? prev + 1 : prev)
  }, !!size && tick >= 0 && !end ? delay : null)

  useEffect(handleChangeTickEffect, [tick])

  return (
    <div className="container">
      <button onClick={handleAddGrid} disabled={!!size} data-testid='addGridBtn'>add random grid</button>
      <button onClick={handleStart} disabled={!size || tick > 0} data-testid="startBtn">start</button>
      <button onClick={handleReset} disabled={!size || tick === -10} data-testid="reseBtn">Reset all</button>
      <h2 style={{color: end ? 'red' : 'initial'}} data-testid="generationHeader">Generations: {tick > 0 && tick}</h2>
      {end && <span>there are no changes since last tick, or all live cells died</span>}
      {size && <Grid matrix={matrix}/>}
    </div>
  );
}

export default Game;
