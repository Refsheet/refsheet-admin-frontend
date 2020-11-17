import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('spends some time loading', () => {
  render(<App />)
  const linkElement = screen.getByText(/Loading.../i)
  expect(linkElement).toBeInTheDocument()
})
