import {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} from '../../services/notesAPI'
import type { Note } from '@utils/types'

const createApiNote = async (content: string) => {
  const note: Note = { content, important: true }
  const response = createNote(note)
  return response
}

test('creates and gets a note from api', async () => {
  const content = 'Creates and gets a note from api'
  const response = await createApiNote(content)

  if (!response) throw new Error('Expect response to be defined')
  const newNote = response.data

  expect(response.status).toBe(200)
  expect(newNote.content).toBe(content)
  expect(newNote.important).toBe(true)
})

test('gets all notes from api', async () => {
  const content1 = 'get all notes 1'
  const content2 = 'get all notes 2'
  await createApiNote(content1)
  await createApiNote(content2)

  const allNotes = await getAllNotes()

  if (allNotes && allNotes.data) expect(allNotes.data.length).toBe(2)
})

test('gets one note from api', async () => {
  const content = 'get one note'
  const createNoteResponse = await createApiNote(content)

  if (createNoteResponse === undefined) throw new Error('test: get one note: create note resposne undefined')

  const note = createNoteResponse.data

  const retrievedNoteResponse = await getNote(note.id)
  if (retrievedNoteResponse === undefined) throw new Error('test: get one note: retrieved note response undefined')
  const retrievedNote = retrievedNoteResponse.data
  expect(retrievedNote.content).toBe(content)
})

test('update one note from api', async () => {
  const content = 'update one note from api'
  const createNoteResponse = await createApiNote(content)

  if (createNoteResponse === undefined) throw new Error('test: update one note from api - create note response undefined')
  const createdNote = createNoteResponse.data

  const newData = { content: 'updated data' }
  const updateNoteResponse = await updateNote(createdNote.id, newData)

  if (updateNoteResponse === undefined) throw new Error('test: update one note from api - update note response undefined')
  const updatedResult = updateNoteResponse.data.result
  const updatedNote = updateNoteResponse.data.note

  expect(updatedNote.id).toBe(createdNote.id)
  expect(updatedNote.content).toBe('updated data')
  expect(updatedResult.modifiedCount).toBe(1)
})

test('deletes note from api', async () => {
  const contents = "delete note from api"
  const createdNoteResponse = await createApiNote(contents)
  const createdNote = createdNoteResponse.data

  const deleteNoteResponse = await deleteNote(createdNote.id)
  if (deleteNoteResponse === undefined) throw new Error('test: notesAPI - deletes note from api: delete response undefined')
  const responseData = deleteNoteResponse.data

  expect(responseData.result.deletedCount).toBe(1)
})
