const asyncHandler = require('../middleware/asyncHandler');
const { Notes } = require('../models');

const noteConroller = {
  getAllNotes: asyncHandler(async (req, res) => {
    const notes = await Notes.findAll({
      raw: true,
      nest: true,
    });

    res.json(notes);
  }),
  getNote: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const note = await Notes.findByPk(id, {
      raw: true,
      nest: true,
    });

    if (!note) {
      res.status(404);
      throw new Error('Resource not found');
    }

    res.json(note);
  }),
  createNote: asyncHandler(async (req, res) => {
    return res.send('create note');
  }),
  editNote: asyncHandler(async (req, res) => {
    return res.send('edit note');
  }),
  deleteNote: asyncHandler(async (req, res) => {
    return res.send('delete note');
  }),
};

module.exports = noteConroller;
