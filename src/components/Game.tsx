import React, {useEffect, useState} from 'react';

import Grid from "../components/Grid/Grid";
import generateGrid from "../utils/generate-grid";
import makeTick from "../utils/make-tick";
import useInterval from "../utils/use-interval";

type GameType = {
  delay: number
}

const Game = ({delay}: GameType) => {
  const [tick, setTick] = useState(-1)
  const [matrix, setMatrix] = useState(generateGrid(0))
  const [end, setEnd] = useState(false)
  const size = matrix?.[0]?.length || false

  const handleAddGrid = () => {
    setMatrix(generateGrid(10))
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
    setTick(prev => prev >= 0 && !end ? prev + 1 : prev)
  }, !!size && tick >= 0 ? delay : null)

  useEffect(handleChangeTickEffect, [tick])

  return (
    <div className="container">
      <button onClick={handleAddGrid} disabled={!!size}>add random grid</button>
      <button onClick={handleStart} disabled={!size || tick > 0}>start</button>
      <button onClick={handleReset} disabled={!size || tick === -10}>Reset all</button>
      <h2 style={{color: end ? 'red' : 'initial'}}>Generations: {tick > 0 && tick}</h2>
      {size && <Grid matrix={matrix}/>}
    </div>
  );
}

export default Game;
