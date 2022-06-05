import generateGrid from "../generate-grid";

it('generates the grid given size', () => {
  const size = 5
  const resGrid = generateGrid(size)
  const xLength = resGrid.length
  const yLength = resGrid.length

  expect(xLength).toEqual(yLength)
  expect(xLength).toEqual(5)
})

it('generates the grid with 0 or 1 values', () => {
  const resGrid = generateGrid(5)

  resGrid.forEach(row => {
    row.forEach(cell => {
      expect(cell).toBeGreaterThanOrEqual(0)
      expect(cell).toBeLessThanOrEqual(1)
    })
  })
})