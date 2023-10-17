const express = require('express');
const router = express.Router();
const noteConroller = require('../controller/noteController');

// get all notes
router.get('/', noteConroller.getAllNotes);
// get specific note
router.get('/:id', noteConroller.getNote);
// create note
router.post('/', noteConroller.createNote);
// edit note
router.put('/:id/edit', noteConroller.editNote);
// delete note
router.delete('/:id/delete', noteConroller.deleteNote);

module.exports = router;
