import {render, screen, cleanup} from '@testing-library/react'

import GridCell from "./GridCell";

afterEach(cleanup)

it('contains corresponding class when alive', () => {
  render(<GridCell isAlive={true}/>)

  const byTestId = screen.getByTestId('matrixCell');

  expect(byTestId.classList.contains('grid-cell--alive')).toBeTruthy()
})