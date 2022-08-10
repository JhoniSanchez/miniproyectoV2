import Notes from "../models/Notes.js";

export const newNote = async (req, res)=>{

    const {name, email} = req.body;
    const createNewNote = new Notes({name, email});
    const saved = await createNewNote.save()
    res.json(saved)
}









export const getAllNotes = async (req, res)=>{

    const filters = req.query.user;
    const AllNotesByEmail = await Notes.find(        
        { email: filters }        
        );    
    res.json(AllNotesByEmail);
}

export const getAllPendingNotes = async (req, res)=>{

    const filters = req.query.user;

    const AllNotesByEmail = await Notes.find({
         email: filters ,
         pending: true});    
    res.json(AllNotesByEmail);
}
export const getAllNotesDone = async (req, res)=>{

    const filters = req.query.user;
    const AllNotesByEmail = await Notes.find({
                email: filters , 
                pending: false});    
    res.json(AllNotesByEmail);
}

export const updateNote = async (req, res)=>{
   const searchNotes = await Notes.findByIdAndUpdate(req.params.Id, req.body)
    res.json(searchNotes)
}
export const markNoteDone = async (req, res)=>{
   const searchNotes = await Notes.findByIdAndUpdate(req.params.Id, { pending: false})
    res.json(searchNotes)
}
export const removeNote = async (req, res)=>{
    await Notes.findByIdAndDelete(req.params.Id)  
res.json()
}


export const deleteAllNotesDone = async (req, res)=>{

    const filters = req.query.user;

    const AllNotesByEmail = await Notes.find({         
        email: filters , 
        pending: false});    
    AllNotesByEmail.map(async (nota) => { await Notes.findByIdAndDelete(nota._id) });
    res.json(AllNotesByEmail)

} 

