import {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} from '../../services/notesAPI'
import type { Note } from '@utils/types'

const createApiNote = async (content: string): Promise<Note> => {
  const note: Note = { content, important: true }
  const createdNote = await createNote(note)
  return createdNote
}

test.skip('creates and gets a note from api', async () => {
  const content = 'Creates and gets a note from api'
  const createdNote = await createApiNote(content)

  if (!createdNote) throw new Error('Expect response to be defined')

  expect(createdNote.content).toBe(content)
  expect(createdNote.important).toBe(true)
})

test.skip('gets all notes from api', async () => {
  const content1 = 'get all notes 1'
  const content2 = 'get all notes 2'
  await createApiNote(content1)
  await createApiNote(content2)

  const allNotes = await getAllNotes()

  expect(allNotes.length).toBe(2)
})

test.skip('gets one note from api', async () => {
  const testName = 'test: gets one note from api - '
  const content = 'get one note'
  const createdNote = await createApiNote(content)

  if (typeof createdNote.id !== 'string') throw new Error(testName + 'id property is undefined')
  const retrievedNote = await getNote(createdNote.id)
  expect(retrievedNote.content).toBe(content)
})

test.skip('update one note from api', async () => {
  const testName = 'test: gets one note from api - '
  const content = 'update one note from api'
  const createdNote = await createApiNote(content)

  const newData = { content: 'updated data' }
  if (typeof createdNote.id !== 'string') throw new Error(testName + 'id property is undefined')
  const updatedNote = await updateNote(createdNote.id, newData)

  if (typeof updatedNote.id !== 'string') throw new Error(testName + 'id property is undefined')
  expect(updatedNote.id).toBe(createdNote.id)
  expect(updatedNote.content).toBe('updated data')
})

test.skip('deletes note from api', async () => {
  const testName = 'test: gets one note from api - '
  const content = "delete note from api"
  const createdNote = await createApiNote(content)

  if (typeof createdNote.id !== 'string') throw new Error(testName + 'id property is undefined')
  await deleteNote(createdNote.id)
  const allNotes = await getAllNotes()
  const allIds = allNotes.map(note => note.id)

  expect(allIds).not.toContain(createdNote.id)
})
