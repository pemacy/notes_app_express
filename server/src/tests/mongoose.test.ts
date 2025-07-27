import { expect, test, beforeAll, afterAll } from 'vitest'
import connectTestDB from '../db/test_db'
import Note from '../models/Note'

connectTestDB()
const TEST_NOTE_REGEX = /(\*+)?test/

afterAll(async () => {
  await Note.deleteMany({ content: TEST_NOTE_REGEX })
})

test('should create a note', async () => {
  const note = new Note({
    content: 'test',
    important: true
  })

  const result = await note.save()
  expect(result.content).toBe('test')
  const allTestNotes = Note.find({ content: /^test/ })
  const testNotesCount = await allTestNotes.countDocuments()
  expect(testNotesCount).toBe(1)
})

test.skip('should delete a note', async () => {
  const note = new Note({
    content: 'test',
    important: true
  })
  await note.save()
  let noteCount = await Note.countDocuments()
  expect(noteCount).toBe(1)
  Note.deleteOne({ content: TEST_NOTE_REGEX })
  noteCount = await Note.countDocuments()
  expect(noteCount).toBe(0)
})
