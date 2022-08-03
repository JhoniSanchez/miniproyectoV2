import Nota from "../models/Notas.js"
import Notas from "../models/Notas.js";

export const nuevaNota = async (req, res)=>{

    const {descripcion, email} = req.body;
    const crearNotaNueva = new Nota({descripcion, email});
    const guardada = await crearNotaNueva.save()
    res.json(guardada)
}

export const obtenerTodasLasNotas = async (req, res)=>{

    const filters = req.query.user;
    const TodasLasNotasPorEmail = await Nota.find(        
        { email: filters }        
        );    
    res.json(TodasLasNotasPorEmail);
}

export const obtenerTodasLasNotasPendiente = async (req, res)=>{

    const filters = req.query.user;

    const TodasLasNotasPorEmail = await Nota.find({
         email: filters ,
         pendiente: true});    
    res.json(TodasLasNotasPorEmail);
}
export const obtenerTodasLasNotasRealizadas = async (req, res)=>{

    const filters = req.query.user;
    const TodasLasNotasPorEmail = await Nota.find({
                email: filters , 
                pendiente: false});    
    res.json(TodasLasNotasPorEmail);
}

export const actualizarNota = async (req, res)=>{
   const buscaNotas = await Nota.findByIdAndUpdate(req.params.Id, req.body)
    res.json(buscaNotas)
}
export const marcaNotaRealizada = async (req, res)=>{
   const buscaNotas = await Nota.findByIdAndUpdate(req.params.Id, { pendiente: false})
    res.json(buscaNotas)
}
export const eliminarNota = async (req, res)=>{
    await Nota.findByIdAndDelete(req.params.Id)  
res.json()
}


export const eliminarTodasLasNotasRealizadas = async (req, res)=>{

    const filters = req.query.user;

    const TodasLasNotasPorEmail = await Notas.find({         
        email: filters , 
        pendiente: false});    
    TodasLasNotasPorEmail.map(async (nota) => { await Notas.findByIdAndDelete(nota._id) });
    res.json(TodasLasNotasPorEmail)

}

