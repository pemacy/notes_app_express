import { expect, test } from 'vitest'
import request from 'supertest'
import app from '../app'
import Note from '../models/Note'

test.skip('it should return all notes', async () => {
  const res = await request(app).get('/api/notes')
  expect(res.statusCode).toEqual(200)
})

test.skip('it should create a note', async () => {
  const note = {
    content: 'api test',
    important: true
  }

  const res = await request(app).post('/api/notes/new').send(note).set('Accept', 'application/json')
  console.log('noteRoutes create note - New note created')

  expect(res.statusCode).toBe(200)
  expect(res.body.content).toBe('api test')
  expect(res.body.important).toBe(true)
})

test.skip('it should delete a note', async () => {
  const note = new Note({
    content: 'delete note test',
    important: true
  })

  const newNote = await note.save()
  let noteCount = await Note.countDocuments({})
  expect(noteCount).toBe(1)

  const res = await request(app).delete('/api/notes/' + newNote._id).set('Accept', 'application/json')
  console.log(res.body)
  noteCount = await Note.countDocuments({})
  expect(res.statusCode).toBe(200)
  expect(noteCount).toBe(0)
})

test('it should return an error if note deleted', async () => {
  const note = new Note({
    content: 'delete note error test',
    important: true
  })

  const newNote = await note.save()

  const urlPath = '/api/notes/' + newNote._id

  let res = await request(app).delete(urlPath).set('Accept', 'application/json')
  if (res === undefined) throw new Error('test: noteRoutes - it should return an error if note deleted: delete response undefined')
  expect(res.body.result.deletedCount).toBe(1)

  res = await request(app).delete(urlPath).set('Accept', 'application/json')
  if (res === undefined) throw new Error('test: noteRoutes - it should return an error if note deleted: delete response undefined')
  expect(res.body.result.deletedCount).toBe(0)
})

test('it should update a note', async () => {
  const note = new Note({
    content: 'Original note',
    important: true
  })

  const savedNote = await note.save()
  const res = await request(app).put('/api/notes/edit/' + savedNote._id).send({ content: 'Updated note' }).set('Accept', 'application/json')

  const updatedNote = await Note.findById(savedNote._id)
  if (updatedNote) {
    expect(updatedNote.content).toBe('Updated note')
    expect(res.body.note.content).toBe(updatedNote.content)
  }
})

test.skip('delete all notes', async () => {
  const note = new Note({
    content: 'delete all',
    important: true
  })
  const newNote = await note.save()
  const res = await request(app).delete('/api/notes/')
  const noteCount = await Note.countDocuments()
  expect(noteCount).toBe(0)
})
