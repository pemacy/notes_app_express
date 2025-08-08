"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNote = exports.getNoteByID = exports.getAllNotes = void 0;
const Note_1 = __importDefault(require("../models/Note"));
const getAllNotes = async (req, res) => {
    const notes = await Note_1.default.find();
    res.json(notes);
};
exports.getAllNotes = getAllNotes;
const getNoteByID = async (req, res) => {
    const note = Note_1.default.findById(req.params.id);
    res.status(200).json(note);
};
exports.getNoteByID = getNoteByID;
const createNote = async (req, res) => {
    if (!req.body.content) {
        return res.status(400).json({ error: 'content missing' });
    }
    const content = req.body.content;
    const important = req.body.important || false;
    const note = new Note_1.default({ content, important });
    const savedNote = await note.save();
    res.json(savedNote);
};
exports.createNote = createNote;
