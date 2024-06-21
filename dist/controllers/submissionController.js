"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.read = exports.submit = exports.ping = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const dbPath = (0, path_1.join)(__dirname, '../../data/db.json');
const getSubmissions = () => {
    const data = (0, fs_1.readFileSync)(dbPath, 'utf-8');
    return JSON.parse(data).submissions || [];
};
const saveSubmissions = (submissions) => {
    (0, fs_1.writeFileSync)(dbPath, JSON.stringify({ submissions }, null, 2));
};
const ping = (req, res) => {
    res.json({ success: true });
};
exports.ping = ping;
const submit = (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const newSubmission = { name, email, phone, github_link, stopwatch_time };
    const submissions = getSubmissions();
    submissions.push(newSubmission);
    saveSubmissions(submissions);
    res.json({ success: true, message: 'Submission saved successfully' });
};
exports.submit = submit;
const read = (req, res) => {
    const index = parseInt(req.query.index, 10);
    const submissions = getSubmissions();
    if (index >= 0 && index < submissions.length) {
        res.json(submissions[index]);
    }
    else {
        res.status(404).json({ error: 'Submission not found' });
    }
};
exports.read = read;
