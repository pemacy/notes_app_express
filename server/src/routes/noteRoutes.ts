import express from 'express'
import {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} from '../controllers/noteController'
import { Request, Response } from 'express'

const router = express.Router()

router.get('/env', (_req: Request, res: Response) => {
  const nodeEnv = process.env.NODE_ENV || 'production'
  res.json({ env: nodeEnv })
})

router.get('/', getAllNotes)
router.post('/new', createNote)
router.get('/:id', getNote)
router.delete('/:id', deleteNote)
router.put('/edit/:id', updateNote)

export default router
