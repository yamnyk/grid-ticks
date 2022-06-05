import makeTick from "../make-tick";
import generateGrid from "../generate-grid";
import exp from "constants";

it('returns Tick like object', () => {
  const matrix = generateGrid(5)
  const {
    newMatrix,
    liveCells,
    hasChanged
  } = makeTick(matrix)

  expect(newMatrix).toBeDefined()
  expect(liveCells).toBeDefined()
  expect(hasChanged).toBeDefined()
})

it('returns same matrix when it stuck', () => {
  const matrix = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ]
  const {newMatrix,hasChanged} = makeTick(matrix)

  const flattenMatrix = matrix.flat(1)
  const flattenNewMatrix = newMatrix.flat(1)

  expect(hasChanged).toBeTruthy()
  expect(flattenMatrix.every((cell, ind) => cell === flattenNewMatrix[ind])).toBeTruthy()
})

it('turn horizontal lise into vertical', () => {
  const matrix = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ]
  const expectedMatrix = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
  ]
  const {newMatrix} = makeTick(matrix)

  const flattenNewMatrix = newMatrix.flat(1)
  const flattenExpectedMatrix = expectedMatrix.flat(1)

  expect(flattenExpectedMatrix.every((cell, ind) => cell === flattenNewMatrix[ind])).toBeTruthy()
})

it('return zero live cells', () => {
  const matrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 1, 0],
  ]
  const {newMatrix, liveCells} = makeTick(matrix)

  const flattenNewMatrix = newMatrix.flat(1)

  expect(liveCells).toEqual(0)
  expect(flattenNewMatrix.reduce((acc, curr) => acc + curr,0)).toEqual(0)
})