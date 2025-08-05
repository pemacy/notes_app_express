import { render, screen, fireEvent } from '@testing-library/react'
import Form from '../../components/Form'
import { onFormSubmit } from '../../services/onSubmitCallbacks'
import { getAllNotes } from '../../services/notesAPI'

const isHTMLInputElement = (node: unknown): node is HTMLInputElement => {
  return node instanceof HTMLInputElement
}

test.skip('renders form data', () => {
  const cb = vi.fn()

  render(<Form onSubmit={cb} />)

  const input = screen.getByLabelText('Content') as HTMLInputElement
  input.value = 'Hello'
  //const submit = screen.getByText('Submit')
  //const form = submit.closest('form')
  const form = screen.getByText('Submit').closest('form')

  if (form instanceof HTMLFormElement) {
    fireEvent.submit(form)
  }

  expect(cb).toHaveBeenCalled()
})

test.skip('form submit creates new note', async () => {
  const testName = 'test: form submit creates new note - '
  render(<Form onSubmit={onFormSubmit} />)

  const form = screen.getByText('Submit').closest('form')
  const contentInput = document.getElementById('content')

  if (!isHTMLInputElement(contentInput)) throw new Error(testName + 'content input is not an input element')
  contentInput.value = 'form submit create new note'

  if (form instanceof HTMLFormElement) {
    fireEvent.submit(form)
  }

  const allNotes = await getAllNotes()
  if (allNotes === undefined) throw new Error(testName + 'allNotes undefined')
  expect(allNotes.length).toBe(1)
})
