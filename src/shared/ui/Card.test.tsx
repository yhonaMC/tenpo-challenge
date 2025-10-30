import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Card } from './Card'

describe('Card', () => {
  it('renders children content', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies default styles', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('bg-[#1a1a1a]', 'border', 'border-gray-800', 'rounded-lg')
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-card">Content</Card>)
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('custom-card')
  })

  it('handles click events when onClick is provided', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    const { container } = render(<Card onClick={handleClick}>Clickable Card</Card>)
    const card = container.firstChild as HTMLElement
    
    await user.click(card)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies hover styles when onClick is provided', () => {
    const handleClick = vi.fn()
    const { container } = render(<Card onClick={handleClick}>Clickable Card</Card>)
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('cursor-pointer')
  })

  it('does not apply hover styles when onClick is not provided', () => {
    render(<Card>Non-clickable Card</Card>)
    const card = screen.getByText('Non-clickable Card').parentElement
    expect(card).not.toHaveClass('cursor-pointer')
  })

  it('renders complex children', () => {
    render(
      <Card>
        <h2>Title</h2>
        <p>Description</p>
        <button>Action</button>
      </Card>
    )
    
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
  })
})

