import Notes from "../models/Notes.js";

export const newNote = async (req, res) => {
    try {
        const { name, email } = req.body;
        const createNewNote = new Notes({ name, email });
        const saved = await createNewNote.save();
        res.json(saved);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving note' });
    }
};



export const getAllNotes = async (req, res) => {
    try {
        const filters = req.query.user;
        const AllNotesByEmail = await Notes.find({ email: filters });
        res.json(AllNotesByEmail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting notes' });
    }
};


export const getAllPendingNotes = async (req, res) => {
    try {
        const filters = req.query.user;
        const AllNotesByEmail = await Notes.find({
            email: filters,
            pending: true
        });
        res.json(AllNotesByEmail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting pending notes' });
    }
};


export const getAllNotesDone = async (req, res) => {
    try {
        const filters = req.query.user;
        const AllNotesByEmail = await Notes.find({
            email: filters,
            pending: false
        });
        res.json(AllNotesByEmail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting completed notes' });
    }
};

export const updateNote = async (req, res) => {
    try {
        const searchNotes = await Notes.findByIdAndUpdate(req.params.Id, req.body, { new: true });
        res.json(searchNotes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating note' });
    }
};

export const markNoteDone = async (req, res) => {
    try {
        const searchNotes = await Notes.findByIdAndUpdate(req.params.Id, { pending: false }, { new: true });
        res.json(searchNotes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error marking note as completed' });
    }
};

export const removeNote = async (req, res) => {
    try {
        const deletedNote = await Notes.findByIdAndDelete(req.params.Id);
        if (!deletedNote) {
            return res.status(404).json({ error: 'Note to delete not found' });
        }
        res.json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting note' });
    }
};


export const deleteAllNotesDone = async (req, res) => {
    try {
        const filters = req.query.user;

        const AllNotesByEmail = await Notes.find({
            email: filters,
            pending: false
        });

        await Promise.all(AllNotesByEmail.map(async (nota) => {
            await Notes.findByIdAndDelete(nota._id);
        }));

        res.json(AllNotesByEmail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting completed notes' });
    }
};

