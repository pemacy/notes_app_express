import { updateNote, getAllNotes } from "./notesAPI"
import type { Note } from '@utils/types'
import type { FormEvent } from "react"

export const handleImportanceChange = async (
  e: FormEvent<HTMLInputElement>,
  setAllNotes: React.Dispatch<React.SetStateAction<Note[]>>) => {

  e.preventDefault()
  const checkBox = e.currentTarget

  checkBox.disabled = true
  const important = checkBox.checked
  const id = checkBox.value

  await updateNote(id, { important })
  const allNotes = await getAllNotes()
  setAllNotes(allNotes)
  checkBox.disabled = false
}
