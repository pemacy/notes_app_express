import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Note from '../models/Note'
import logger from '../utils/logger'

export const getAllNotes = async (_req: Request, res: Response) => {
  let notes
  notes = await Note.find()
  res.json(notes)
}

export const getNote = async (req: Request, res: Response) => {
  const note = Note.findById(req.params.id)
  res.status(200).json(note)
}

export const createNote = async (req: Request, res: Response) => {
  if (!req.body.content) {
    logger.warning('content missing', String(Object.getOwnPropertyNames(req)))
    return res.status(400).json({ error: 'content missing' })
  }
  const content = req.body.content
  const important = req.body.important || false
  const note = new Note({ content, important })
  const savedNote = await note.save()
  res.json(savedNote)
}

export const deleteNote = async (req: Request, res: Response) => {
  const id = req.params.id
  const note = await Note.findById(id)
  try {
    const deletedNote = await Note.deleteOne({ _id: id })
    if (deletedNote.acknowledged === true) {
      res.json(note)
    } else {
      res.status(400).json(deletedNote)
    }
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      res.status(400).json({ error: 'Invalid ID Format' })
    } else {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

}

export const updateNote = async (req: Request, res: Response) => {
  const id = req.params.id
  const body = req.body

  const updateResult = await Note.updateOne({ _id: id }, body)
  const note = await Note.findById(id)

  if (updateResult.acknowledged === true && updateResult.modifiedCount === 1) {
    const updatedNote = await Note.findById(id)
    res.json(note)
  } else {
    res.statusCode = 400
    res.json({ error: 'Update failed' })
  }

}
