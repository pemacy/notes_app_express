"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
mongoose_1.default.set('strictQuery', false);
const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@reactcoursenotesapp.1rkxnqc.mongodb.net/${process.env.MONGO_DB_TEST}?retryWrites=true&w=majority&appName=ReactCourseNotesApp`;
const connectTestDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(url);
        console.log('Test database connected');
        return conn;
    }
    catch (err) {
        console.log('MongoDB connection error', err);
        process.exit(1);
    }
};
exports.default = connectTestDB;
