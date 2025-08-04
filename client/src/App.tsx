//import { useState } from 'react'
import './App.css'
import Form from './components/Form'

const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  console.log('Form is submitted')
}

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <h1>Notes App</h1>
      <Form onSubmit={onFormSubmit} />
    </>
  )
}

export default App
