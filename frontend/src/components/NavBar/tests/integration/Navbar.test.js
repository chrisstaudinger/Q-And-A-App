import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import NavBar from '../../NavBar'
import auth0Client from '../../../../Auth'
jest.mock('../../../../Auth')

afterEach(cleanup)

it('renders', () => {
  const { asFragment } = render(
  <MemoryRouter> 
    <NavBar /> 
  </MemoryRouter>
  )
  expect(asFragment()).toMatchSnapshot()
})

describe('Sign in', () => {
  it('should invoke auth signIn', () => {
    const { getByText } = render(
    <MemoryRouter> 
      <NavBar /> 
    </MemoryRouter>
    )
    const signInButton = getByText('Sign In')
    fireEvent.click(signInButton)
    expect(auth0Client.signIn).toHaveBeenCalledTimes(1)
  })
})