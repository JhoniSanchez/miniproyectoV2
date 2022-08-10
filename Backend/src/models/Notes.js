import mongoose from "mongoose";
const { Schema, model } = mongoose;

const NoteSchema = new Schema({
    name:String, 
    email: String,   
    pending: {
        type: Boolean,
        default: true
    },
    
}, 
{ 
    timestamps:true, 
    versionKey: false
},

)

export default model("Note", NoteSchema)