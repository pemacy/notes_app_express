import { render, screen, fireEvent } from '@testing-library/react'
import Form from '../../components/Form'

const isElement = (val: unknown): val is Element => {
  return val instanceof Element
}

test.skip('renders form data', () => {
  const cb = vi.fn(e => e.preventDefault())

  render(<Form onSubmit={cb} />)

  const input = screen.getByLabelText('Enter Content') as HTMLInputElement
  input.value = 'Hello'
  //const submit = screen.getByText('Submit')
  //const form = submit.closest('form')
  const form = screen.getByText('Submit').closest('form')

  let formType

  if (form instanceof HTMLFormElement) {
    fireEvent.submit(form)
  } else if (isElement(form)) {
    formType = (form as Element).constructor.name
  } else {
    formType = 'null'
  }
  console.log("element is type:", formType)
  expect(cb).toHaveBeenCalled()
  //expect(1 + 2).toBe(2)
})
