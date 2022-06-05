const getNeighbors = (src: Array<Array<number>>, posY: number, posX: number): Array<number> => {
  return [
    src[posY]?.[posX - 1] || 0,
    src[posY]?.[posX + 1] || 0,
    src[posY - 1]?.[posX] || 0,
    src[posY - 1]?.[posX + 1] || 0,
    src[posY - 1]?.[posX - 1] || 0,
    src[posY + 1]?.[posX] || 0,
    src[posY + 1]?.[posX + 1] || 0,
    src[posY + 1]?.[posX - 1] || 0,
  ]
}

type TickType = {
  newMatrix: Array<Array<number>>,
  liveCells: number,
  hasChanged: boolean
}

const makeTick = (src: Array<Array<number>>): TickType => {
  let liveCells = src.length * src.length
  let hasChanged = false

  // does over each cell in the matrix and calculates new value for every cell
  const newMatrix = src
    .map((row: number[], y: number) => row
      .map((cell: number, x: number) => {
        const allNeighbors = getNeighbors(src, y, x)
        const liveNeighbors = allNeighbors.reduce((acc, curr) => curr + acc)

        if (cell === 1) {
          if (liveNeighbors < 2) {
            --liveCells
            hasChanged = true
            return 0
          } else if (liveNeighbors === 2 || liveNeighbors === 3) {
            return 1
          } else {
            --liveCells
            hasChanged = true
            return 0
          }
        } else if (cell === 0) {
          if (liveNeighbors === 3) {
            hasChanged = true
            return 1
          } else {
            --liveCells
            return 0
          }
        }

        return cell
      }))

  return {
    newMatrix,
    liveCells,
    hasChanged
  }
}

export default makeTick