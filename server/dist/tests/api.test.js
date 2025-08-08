"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const vitest_1 = require("vitest");
const test_db_1 = __importDefault(require("../db/test_db"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const Note_1 = __importDefault(require("../models/Note"));
(0, vitest_1.beforeAll)(async () => {
    await (0, test_db_1.default)();
    const note = new Note_1.default({
        content: 'test note',
        important: true
    });
    await note.save();
});
(0, vitest_1.afterAll)(async () => {
    await Note_1.default.deleteMany({});
    await mongoose_1.default.connection.close();
});
(0, vitest_1.test)('it should return all notes', async () => {
    const res = await (0, supertest_1.default)(app_1.default).get('/api/notes');
    (0, vitest_1.expect)(res.statusCode).toEqual(200);
});
(0, vitest_1.test)('it should create a note', async () => {
    const newNote = { content: 'test', important: true };
    const res = await (0, supertest_1.default)(app_1.default).post('/api/notes/new').send(newNote).set('Accept', 'application/json');
    const noteCount = await Note_1.default.countDocuments();
    (0, vitest_1.expect)(res.body.content).toBe('test');
    (0, vitest_1.expect)(res.body.important).toBe(true);
    (0, vitest_1.expect)(noteCount).toBe(2);
});
