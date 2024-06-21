"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
const DB_FILE = path_1.default.join(__dirname, '../data/db.json');
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// Endpoint to check server status
app.get('/ping', (req, res) => {
    res.send(true);
});
// Endpoint to submit data
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).send('All fields are required');
    }
    const newSubmission = { name, email, phone, github_link, stopwatch_time };
    fs_1.default.readFile(DB_FILE, 'utf-8', (err, data) => {
        if (err)
            return res.status(500).send('Server error');
        const submissions = data ? JSON.parse(data) : [];
        submissions.push(newSubmission);
        fs_1.default.writeFile(DB_FILE, JSON.stringify(submissions, null, 2), (err) => {
            if (err)
                return res.status(500).send('Server error');
            res.send('Submission saved');
        });
    });
});
// Endpoint to read data
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index, 10);
    if (isNaN(index) || index < 0) {
        return res.status(400).send('Invalid index');
    }
    fs_1.default.readFile(DB_FILE, 'utf-8', (err, data) => {
        if (err)
            return res.status(500).send('Server error');
        const submissions = data ? JSON.parse(data) : [];
        if (index >= submissions.length) {
            return res.status(404).send('No submission at this index');
        }
        res.json(submissions[index]);
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
