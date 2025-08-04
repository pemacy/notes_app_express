import axios, { AxiosError } from 'axios'
import type { Note } from "@utils/types"

const notesUrl = process.env.NOTES_URL || 'http://localhost:3001/api/notes'

export const getAllNotes = async () => {
  let response
  try {
    response = await axios.get(notesUrl)
  } catch (err) {
    if (err instanceof AxiosError) {
      return response
    }
  }
  return response
}

export const createNote = async (note: Note) => {
  let response
  try {
    response = await axios.post(notesUrl + '/new', { body: note })
  } catch (err) {
    if (err instanceof AxiosError) {
      return response
    }
  }
  return response
}

export const getNote = async (id: string) => {
  let response
  try {
    response = await axios.get(notesUrl + `/${id}`)
  } catch (err) {
    if (err instanceof AxiosError) {
      return response
    }
  }
  return response
}
