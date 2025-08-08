"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dev_db_1 = __importDefault(require("./db/dev_db"));
(0, dev_db_1.default)();
app_1.app.listen(app_1.PORT, () => {
    console.log('express server running on port', app_1.PORT);
});
