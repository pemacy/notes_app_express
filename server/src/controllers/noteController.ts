import { Request, Response } from 'express'
import Note from '../models/Note'

export const getAllNotes = async (req: Request, res: Responst) => {
  const notes = await Note.find()
  res.json(notes)
}

export const getNoteByID = async (req: Request, res: Response) => {
  const note = Note.findById(req.params.id)
  res.status(201).json(note)
}
