import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import {render} from '@testing-library/react'



test('React Testing Library works!', () => {
    const {getByText} = render(<Posts />)
    expect(getByText(/Posts/i)).toBeInTheDocument()
  })