import { deleteNote, getAllNotes } from '../services/notesAPI'
import type { MouseEvent } from 'react'
import type { Note } from '@utils/types'

export const handleNoteDelete = async (e: MouseEvent<HTMLSpanElement>,
  setAllNotes: React.Dispatch<React.SetStateAction<Note[]>>) => {
  e.stopPropagation()

  const span = e.currentTarget
  const id = span.dataset['noteId']

  const canDelete = confirm('Are you sure you want to delete this note?')
  if (!canDelete) return

  if (typeof id !== 'string') throw new Error('Incorrect ID for note deletion')

  const deletedNote = await deleteNote(id)
  console.log(deletedNote)

  if (deletedNote.deletedCount === 1) {
    const allNotes = await getAllNotes()
    setAllNotes(allNotes)
  } else {
    throw new Error('Note not deleted, an error occured')
  }
}
