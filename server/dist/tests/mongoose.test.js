"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const vitest_1 = require("vitest");
const test_db_1 = __importDefault(require("../db/test_db"));
const Note_1 = __importDefault(require("../models/Note"));
const TEST_NOTE_REGEX = /(\*+)?test/;
(0, vitest_1.beforeAll)(async () => {
    await (0, test_db_1.default)();
});
(0, vitest_1.afterEach)(async () => {
    await Note_1.default.deleteMany({});
});
(0, vitest_1.afterAll)(async () => {
    mongoose_1.default.connection.close();
});
vitest_1.test.skip('should create a note', async () => {
    const note = new Note_1.default({
        content: 'test',
        important: true
    });
    const result = await note.save();
    (0, vitest_1.expect)(result.content).toBe('test');
    const allTestNotes = Note_1.default.find({ content: /^test/ });
    const testNotesCount = await allTestNotes.countDocuments();
    (0, vitest_1.expect)(testNotesCount).toBe(1);
});
vitest_1.test.skip('should delete a note', async () => {
    const note = new Note_1.default({
        content: 'test',
        important: true
    });
    await note.save();
    let noteCount = await Note_1.default.countDocuments();
    (0, vitest_1.expect)(noteCount).toBe(1);
    await Note_1.default.deleteOne({ content: TEST_NOTE_REGEX });
    noteCount = await Note_1.default.countDocuments();
    (0, vitest_1.expect)(noteCount).toBe(0);
});
