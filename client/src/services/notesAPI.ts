import axios, { AxiosError } from 'axios'
import type { AxiosResponse } from 'axios'
import type { Note } from "@utils/types"

const notesUrl = process.env.NOTES_URL || 'http://localhost:3001/api/notes'

export const getAllNotes = async () => {
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
    return response
  }
}

export const createNote = async (note: Note): Promise<AxiosResponse> => {
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
    return response
  }
}

export const getNote = async (id: string): Promise<AxiosResponse> => {
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
    return response
  }
}

export const updateNote = async (id: string, data: { content?: string, important?: boolean }): Promise<AxiosResponse> => {
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
    return response
  }
}

export const deleteNote = async (id: string) => {
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
    return response
  }
}
