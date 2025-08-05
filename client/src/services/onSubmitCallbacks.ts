import { createNote, getAllNotes } from "./notesAPI"
import type { Note } from '@utils/types'
import type { FormEvent } from "react"

export const onFormSubmit = async (
  e: FormEvent<HTMLFormElement>,
  setAllNotes: React.Dispatch<React.SetStateAction<Note[]>>) => {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  const content = String(formData.get('content'))
  const important = formData.get('important') === 'important' ? true : false
  const contentInput = document.getElementById('content')
  const importantRaio = document.getElementById('important')
  const notImportantRaio = document.getElementById('not-important')

  console.log("Content", content, "Important:", important)

  const note = { content, important }
  console.log(note)
  await createNote(note)
  const allNotes = await getAllNotes()
  setAllNotes(allNotes)
  if (contentInput instanceof HTMLInputElement) contentInput.value = ''
  if (importantRaio instanceof HTMLInputElement) importantRaio.checked = true
  if (notImportantRaio instanceof HTMLInputElement) notImportantRaio.checked = false
}
