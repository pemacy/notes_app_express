import type { DisplayNoteProps, } from '@utils/types'
import { handleImportanceChange } from '../services/onChangeCallbacks'
import { handleNoteDelete } from '../services/onClickCallbacks'

const DisplayNotes = ({ allNotes, setAllNotes }: DisplayNoteProps) => {
  return (
    <ul className='text-left ml-4'>
      {allNotes.map(note =>
        <li
          key={note.id}
          className='flex justify-between'
        >
          <div className='flex basis-1/2'>
            <span className='basis-1/2 inline'>{note.content}</span>
            <div className='basis-1/2 inline space-x-2'>
              <span >
                <input
                  type="checkbox"
                  checked={note.important}
                  onChange={(e) => handleImportanceChange(e, setAllNotes)}
                  value={note.id}
                />
              </span>
              <span>
                Important
              </span>
            </div>
          </div>
          <div className='basis-1/2 text-right'>
            <span
              data-note-id={note.id}
              className='hover:text-gray-500 hover:cursor-pointer'
              onClick={(e) => handleNoteDelete(e, setAllNotes)}
            >
              Delete
            </span>
          </div>
        </li>
      )}
    </ul>
  )
}

export default DisplayNotes
