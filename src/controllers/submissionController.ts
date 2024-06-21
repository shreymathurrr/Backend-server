import { Request, Response } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Submission } from '../models/submission';

const dbPath = join(__dirname, '../../data/db.json');

const getSubmissions = (): Submission[] => {
  const data = readFileSync(dbPath, 'utf-8');
  return JSON.parse(data).submissions || [];
};

const saveSubmissions = (submissions: Submission[]) => {
  writeFileSync(dbPath, JSON.stringify({ submissions }, null, 2));
};

export const ping = (req: Request, res: Response) => {
  res.json({ success: true });
};

export const submit = (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  const newSubmission: Submission = { name, email, phone, github_link, stopwatch_time };
  const submissions = getSubmissions();
  submissions.push(newSubmission);
  saveSubmissions(submissions);
  res.json({ success: true, message: 'Submission saved successfully' });
};

export const read = (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);
  const submissions = getSubmissions();
  if (index >= 0 && index < submissions.length) {
    res.json(submissions[index]);
  } else {
    res.status(404).json({ error: 'Submission not found' });
  }
};
