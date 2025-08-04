import { expect, test } from 'vitest'
import Note from '../models/Note'

test.skip('should create a note', async () => {
  const note = new Note({
    content: 'Test Create a Note',
    important: true
  })
  const newNote = await note.save()

  expect(newNote.content).toBe('Test Create a Note')
  console.log('nodeModel create note - Note created')

  const notes = await Note.find({})
  console.log('nodeModel create note - All notes found')
  expect(notes.length).toBe(1)
})

test.skip('should retrieve a note by id', async () => {
  const note = new Note({
    content: 'Test: Retrieve Note',
    important: true
  })

  const newNote = await note.save()
  console.log('nodeModel find by ID - Note created')
  const findNote = await Note.findById(newNote.id)
  console.log('nodeModel find by ID - Note found by ID')

  if (findNote && 'content' in findNote) {
    expect(findNote.content).toBe('Test: Retrieve Note')
  }
})

test.skip('should retrieve all notes', async () => {
  const note = new Note({
    content: 'Test: Retrieve Note',
    important: true
  })
  await note.save()

  const allNotes = await Note.find()
  expect(allNotes.length).toBe(1)
})

test.skip('should delete a note', async () => {
  const note = new Note({
    content: 'Test: Retrieve Note',
    important: true
  })

  const newNote = await note.save()

  await Note.deleteOne({ id: newNote.id })
  const allNotes = await Note.find()
  expect(allNotes.length).toBe(0)
})
