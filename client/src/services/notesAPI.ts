import axios, { AxiosError } from 'axios'
import type { Note, UpdatedNote, DeletedNote } from "@utils/types"

const host = window.location.hostname
const notesUrl = 'http://' + host + ':3001/api/notes'
//const notesUrl = 'http://localhost:3001/api/notes'

export const getAllNotes = async (): Promise<Note[]> => {
  let response
  try {
    response = await axios.get(notesUrl)
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log('notesAPI#getAllNotes: An AxiosError occurred:', err)
    } else {
      console.log('notesAPI#getAllNotes: an error occurred:', err)
    }
  } finally {
    if (response === undefined) throw new Error('notesAPI#getAllNotes: response undefined')
    return response.data
  }
}

export const createNote = async (note: Note): Promise<Note> => {
  let response
  try {
    response = await axios.post(notesUrl + '/new', note)
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log('notesAPI#createNote: An AxiosError occurred:', err)
    } else {
      console.log('notesAPI#createNote: an error occurred:', err)
    }
  } finally {
    if (response === undefined) throw new Error('notesAPI#createNote: response undefined')
    return response.data
  }
}

export const getNote = async (id: string): Promise<Note> => {
  let response
  const url = notesUrl + `/${id}`
  try {
    response = await axios.get(url)
  } catch (err) {
    console.log(`notesAPI#getNote: url - ${url}`)
    if (err instanceof AxiosError) {
      console.log('notesAPI#getNote: An AxiosError occurred:', err)
    } else {
      console.log('notesAPI#getNote: an error occurred:', err)
    }
  } finally {
    if (response === undefined) throw new Error('notesAPI#getNote: response undefined')
    return response.data
  }
}

export const updateNote = async (id: string, data: { content?: string, important?: boolean }): Promise<UpdatedNote> => {
  const url = notesUrl + '/edit/' + id
  let response
  try {
    response = await axios.put(url, data)
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log('notesAPI#getNote: An AxiosError occurred:', err)
    } else {
      console.log('notesAPI#getNote: An error occurred:', err)
    }
  } finally {
    if (response === undefined) throw new Error('notesAPI#updateNote: server response undefined')
    return response.data
  }
}

export const deleteNote = async (id: string): Promise<DeletedNote> => {
  const url = notesUrl + `/${id}`
  let response
  try {
    response = await axios.delete(url)
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log('notesAPI#getNote: An AxiosError occurred:', err)
    } else {
      console.log('notesAPI#getNote: An error occurred:', err)
    }
  } finally {
    if (response === undefined) throw new Error('notesAPI#deleteNote: server response undefined')
    return response.data
  }
}
