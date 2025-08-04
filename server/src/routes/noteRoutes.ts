import express from 'express'
import {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  deleteAllNotes
} from '../controllers/noteController'
import { Request, Response } from 'express'

const router = express.Router()

if (process.env.NODE_ENV === 'test') {
  router.get('/env', (_req: Request, res: Response) => {
    res.json({ env: 'test' })
  })
  router.delete('/', deleteAllNotes)
}

router.get('/', getAllNotes)
router.post('/new', createNote)
router.get('/:id', getNote)
router.delete('/:id', deleteNote)
router.put('/edit/:id', updateNote)

export default router
