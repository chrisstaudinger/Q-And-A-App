import React from 'react'
import { withRouter, MemoryRouter} from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../../App'

afterEach(cleanup)

test('render', () => {
  const { asFragment } = render(<MemoryRouter><App /></MemoryRouter>)
  expect(asFragment()).toMatchSnapshot()
})
