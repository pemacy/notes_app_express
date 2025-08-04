import { getAllNotes, getNote, createNote } from '../../services/notesAPI'
import type { Note } from '@utils/types'

test('creates and gets a note from api', async () => {
  const note: Note = { content: 'Test', important: true }
  const response = await createNote(note)

  if (!response) throw new Error('Expect response to be defined')
  const newNote = response.data

  expect(newNote.content).toBe('Test')
  expect(newNote.important).toBe(true)
})

test.skip('gets all notes from api', async () => {
  const response = await getAllNotes()

  expect(response).not.toBe(undefined)

  if (!response) throw new Error('Expect response to be defined')

  const notes = response.data
  expect(Array.isArray(notes)).toBe(true)
})

test.skip('get one note')
