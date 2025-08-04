import { expect, test } from 'vitest'
import Note from '../models/Note'

const TEST_NOTE_REGEX = /(\*+)?test/

test.skip('should create a note', async () => {
  console.log('Mongoose create note')
  const note = new Note({
    content: 'test',
    important: true
  })

  const result = await note.save()
  console.log('Mongoose create note - New note created')
  expect(result.content).toBe('test')

  const allTestNotes = await Note.find({ content: /^test/ })
  console.log('Mongoose create note - New note found')
  expect(allTestNotes.length).toBe(1)
})

test.skip('should delete a note', async () => {
  console.log('Mongoose delete note')
  const note = new Note({
    content: 'test',
    important: true
  })

  await note.save()
  console.log('Mongoose delete note - note saved')

  let noteCount = await Note.countDocuments({})
  console.log('Mongoose delete note - notes counted')
  expect(noteCount).toBe(1)

  await Note.deleteOne({ content: TEST_NOTE_REGEX })
  console.log('Mongoose delete note - note deleted')
  noteCount = await Note.countDocuments({})
  console.log('Mongoose delete note - notes counted')
  expect(noteCount).toBe(0)
})

test.skip('should update a note', async () => {
  const note = new Note({
    content: 'First note',
    important: false
  })

  const newNote = await note.save()
  await newNote.updateOne({ content: 'Second note' }).exec()
  const origNote = await Note.findById(newNote.id)

  if (origNote) expect(origNote.content).toBe('Second note')
})
