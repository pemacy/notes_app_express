import { useState, useEffect } from 'react'
import {
  getAllNotes
} from './services/notesAPI'
import './App.css'
import Form from './components/Form'
import DisplayNotes from './components/DisplayNotes'
import type { Note } from '@utils/types'

function App() {
  const [allNotes, setAllNotes] = useState<Note[]>([])

  useEffect(() => {
    getAllNotes().then(notes => {
      setAllNotes(notes)
    })
  }, [])

  return (
    <>
      <h1 className='font-bold text-4xl text-center underline mb-6'>Notes App</h1>
      <h2 className='font-bold text-xl text-left'>All Notes</h2>
      <DisplayNotes allNotes={allNotes} setAllNotes={setAllNotes} />
      <h2 className='font-bold text-xl text-left'>Create Note</h2>
      <Form setAllNotes={setAllNotes} />
    </>
  )
}

export default App
