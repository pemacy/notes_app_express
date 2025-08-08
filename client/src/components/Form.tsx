import type { Note } from '@utils/types'
import { onFormSubmit } from '../services/onSubmitCallbacks'
import type { FormEvent } from 'react'

type onSubmit = React.Dispatch<React.SetStateAction<Note[]>> |
  React.FormEventHandler<HTMLFormElement> |
  ((e: FormEvent<HTMLFormElement>, setAllNotes: React.Dispatch<React.SetStateAction<Note[]>>) => Promise<void>);

type FormProps = {
  setAllNotes?: React.Dispatch<React.SetStateAction<Note[]>>;
  onSubmit?: onSubmit;
}

const Form = ({ setAllNotes }: FormProps) => {
  if (setAllNotes === undefined) throw new Error('setAllNotes undefined')
  return (
    <>
      <form onSubmit={(e) => onFormSubmit(e, setAllNotes)}
        className="p-4 border border-gray-700 rounded-md space-y-4">
        <fieldset className="space-x-2">
          <label htmlFor="content">Content</label>
          <input
            id="content"
            name='content'
            type="text"
            className='border border-white rounded-md py-1 px-2' />
        </fieldset>
        <fieldset className="space-x-2">
          <label htmlFor="important">Imporant</label>
          <input
            defaultChecked
            id="important"
            name='important'
            value='important'
            type="radio"
            className='border border-white rounded-md py-1 px-2' />
          <label htmlFor="not-important">Not Imporant</label>
          <input
            id="not-important"
            name='important'
            value='not important'
            type="radio"
            className='border border-white rounded-md py-1 px-2' />
        </fieldset>
        <button
          type="submit"
          className="w-full mt-2 py-1 border border-sky-800 hover:border-sky-700 hover:bg-gray-800"
        >Submit</button>
      </form>
    </>
  )
}

export default Form
