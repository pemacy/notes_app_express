"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const noteRoute_1 = __importDefault(require("./routes/noteRoute"));
exports.app = (0, express_1.default)();
exports.PORT = process.env.PORT || 3001;
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use('/api/notes', noteRoute_1.default);
exports.default = exports.app;
