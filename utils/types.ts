import mongoose from 'mongoose'
import type { Dispatch } from 'react'


export type Note = {
  content: string;
  important: boolean;
  id?: string
}

export type DisplayNoteProps = {
  allNotes: Note[];
  setAllNotes: Dispatch<React.SetStateAction<Note[]>>;
}

export type allNotesType = {
  allNotes: Note[]
}

export type UpdateNoteResult = {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: mongoose.Types.ObjectId | null;
  upsertedCount: number;
  matchedCount: number;
}

export type DeleteNoteResult = {
  acknowledged: boolean;
  deletedCount: number;
}

export type UpdatedNote = Note & UpdateNoteResult
export type DeletedNote = Note & DeleteNoteResult
