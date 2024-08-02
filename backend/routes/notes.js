const express = require('express');
const verifyUserToken = require('../middleware/verifyUserToken');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// #################--------------- ROUTE 1 ---------------#######################

// fetch all notes for the logged in user using GET - /api/notes/fetchallnotes ---- login required
router.get('/fetchallnotes', verifyUserToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const notes = await Note.find({ user: userId });
        res.json({ error: false, notes });
    } catch (err) {
        res.json({ error: true, errorMessage: 'Internal Server Error' });
    }
})


// #################--------------- ROUTE 2 ---------------#######################

// add a note for the logged in user using POST - /api/notes/addnote ---- login required
router.post('/addnote', verifyUserToken, [
    body('title', 'Enter a valid title, at least 3 characters').isLength({ min: 3 }),
    body('description', 'Enter a valid description, at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    // if validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ error: true, errorsBody: errors.array() });
    }

    const userId = req.user.id;

    const newNote = new Note({
        ...req.body,
        user: new mongoose.Types.ObjectId(userId),
    })

    try {
        const savedNote = await newNote.save();
        res.json({ error: false, savedNote });
    } catch (err) {
        return res.json({ error: true, errorMessage: 'Internal Server Error' });
    }


})

// #################--------------- ROUTE 3 ---------------#######################

// update the note of the logged in user using PUT - /api/notes/updatenote/:id ---- login required
router.put('/updatenote/:id', verifyUserToken, async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user.id;

    // first check if the note is available for this id and this user
    try {
        const findNote = await Note.findOne({ _id: noteId, user: userId });
        if (!findNote) {
            return res.json({ error: true, errorMessage: 'Note not found' });
        }
    } catch (err) {
        return res.json({ error: true, errorMessage: 'invalid Note Id' });
    }

    try {
        const newNote = {};
        const { title, description, tag } = req.body;
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        const updatedNote = await Note.findByIdAndUpdate(noteId, { $set: newNote }, { new: true });
        res.json({ error: false, updatedNote });

    } catch (err) {
        res.json({ error: true, errorMessage: 'Internal Server Error' });
    }
})


// #################--------------- ROUTE 4 ---------------#######################

// Delete the note of the logged in user using DELETE - /api/notes/deletenote/:id ---- login required
router.delete('/deletenote/:id', verifyUserToken, async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user.id;

    // first check if the note is available for this id and this user
    try {
        const findNote = await Note.findOne({ _id: noteId, user: userId });
        if (!findNote) {
            return res.json({ error: true, errorMessage: 'Note not found' });
        }
    } catch (err) {
        return res.json({ error: true, errorMessage: 'invalid Note Id' });
    }

    try {
        const deletedNote = await Note.findByIdAndDelete(noteId);
        res.json({ error: false, deletedNote });

    } catch (err) {
        res.json({ error: true, errorMessage: 'Internal Server Error' });
    }
})

module.exports = router;