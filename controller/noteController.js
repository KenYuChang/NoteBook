const noteConroller = {
  getAllNotes: (req, res) => {
    return res.send('get all notes');
  },
  getNote: (req, res) => {
    return res.send('get note');
  },
  createNote: (req, res) => {
    return res.send('create note');
  },
  editNote: (req, res) => {
    return res.send('edit note');
  },
  deleteNote: (req, res) => {
    return res.send('delete note');
  },
};

module.exports = noteConroller;
