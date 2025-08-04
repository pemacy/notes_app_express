import { Request, Response } from 'express'
import mongoose from 'mongoose'
import type { ObjectId } from 'mongoose'
import Note from '../models/Note'
import logger from '../utils/logger'

export const getAllNotes = async (_req: Request, res: Response) => {
  let notes
  notes = await Note.find()
  res.json(notes)
}

export const getNote = async (req: Request, res: Response) => {
  const note = await Note.findById(req.params.id)
  res.status(200).json(note)
}

export const createNote = async (req: Request, res: Response) => {
  console.log(req.body)
  if (!req.body.content) {
    logger.warning('content missing', String(Object.getOwnPropertyNames(req)))
    res.status(400).json({ error: 'content missing' })
  } else {
    const content = req.body.content
    const important = req.body.important || false
    const note = new Note({ content, important })
    const savedNote = await note.save()
    res.json(savedNote)
  }
}

type DeleteNoteResult = {
  acknowledged: boolean;
  deletedCount: number;
}

export const deleteNote = async (req: Request, res: Response) => {
  const id = req.params.id
  const note = await Note.findById(id)
  try {
    const result: DeleteNoteResult = await Note.deleteOne({ _id: id })
    if (result.acknowledged === true) {
      res.json({ note: note?.toJSON(), result })
    } else {
      res.status(400).json(result)
    }
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      console.log('cast error')
      res.status(400).json({ error: 'Invalid ID Format' })
    } else {
      console.log('server error')
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

}

type UpdateNoteResult = {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: mongoose.Types.ObjectId | null;
  upsertedCount: number;
  matchedCount: number;
}

export const updateNote = async (req: Request, res: Response) => {
  const id = req.params.id
  const body = req.body

  const result: UpdateNoteResult = await Note.updateOne({ _id: id }, body)

  if (result.acknowledged === true) {
    if (result.matchedCount === 0) {
      res.status(301).json({ error: 'no note found', result })
    } else {
      const updatedNote = await Note.findById(id)
      res.json({ note: updatedNote?.toJSON(), result })
    }
  } else {
    res.status(400).json({ error: 'Update failed', result })
  }
}

export const deleteAllNotes = async (_req: Request, res: Response) => {
  const deleteAllResult = await Note.deleteMany({})
  if (deleteAllResult.acknowledged === true) {
    res.json({ success: true, notesDeleted: deleteAllResult.deletedCount })
  } else {
    res.status(400).json(deleteAllResult)
  }
}
