const generateGrid = (size: number): Array<Array<number>> => {
  return Array.from({length: size}, () => [])
    .map(() => Array.from({length: size}, () => Math.floor(Math.random() * 2)))
}
export default generateGrid