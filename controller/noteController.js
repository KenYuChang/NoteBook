const asyncHandler = require('../middleware/asyncHandler');
const { Notes } = require('../models');

const noteConroller = {
  getAllNotes: asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const notes = await Notes.findAll({
      where: { userId },
      raw: true,
      nest: true,
    });

    res.json(notes);
  }),
  getNote: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    const note = await Notes.findOne({
      where: { id, userId },
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
    const { title, content } = req.body;
    const userId = req.user.id;
    const newNote = await Notes.create({
      title,
      content,
      UserId: userId,
    });

    if (newNote) {
      res.status(201).json({
        id: newNote.id,
        title: newNote.title,
        content: newNote.content,
        UserId: newNote.UserId,
      });
    } else {
      res.status(400);
      throw new Error('Faild to create a new note');
    }
  }),
  editNote: asyncHandler(async (req, res) => {
    const noteId = req.params.id;
    const { title, content } = req.body;

    const [updatedRows] = await Notes.update(
      {
        title,
        content,
      },
      {
        where: {
          id: noteId,
          UserId: req.user.id,
        },
      }
    );

    if (updatedRows > 0) {
      res.status(200).json({ message: 'Success updated' });
    } else {
      res.status(404);
      throw new Error('Failed to update note or unauthorized');
    }
  }),
  deleteNote: asyncHandler(async (req, res) => {
    const noteId = req.params.id;
    const deletedRows = await Notes.destroy({
      where: {
        id: noteId,
        UserId: req.user.id,
      },
    });

    if (deletedRows > 0) {
      res.status(200).json({ message: 'Success deleted' });
    } else {
      res.status(404);
      throw new Error('Failed to delete note or unauthorized');
    }
  }),
};

module.exports = noteConroller;
