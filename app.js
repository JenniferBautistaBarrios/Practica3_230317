import express from "express"
import session, { Cookie } from "express-session"

const app=express()

// Configuración del middleware de sessiones 
app.use(session({
    secret: 'Practica03 JBB#Jenny-SessionesPersistentes',
    resave:'false',
    saveUninitialized:true,
    Cookie: {maxAge: 24*60*60*1000}//1 dia   
    
}))
// Ruta para inicializar secion 
app.get('/iniciar-session',(req ,res) => {
    if(!req.session.inicio){
        req.session.inicio= new Date(); // Fecha de inicio de la sesion 
         req.session.ultimoAcceso= new Date(); //ULTIMO CONSULTA INICIAL 
         res.send('Sesion iniciada.')
    }else{
        res.send('La sesion ya esta activa.')
    }
})
// Ruta para actualizar la fecha de la ukltima consulta 
app.get ('/actualizar',(req,res)=>{
    if(req.session.inicio){
        req.session.ultimoAcceso = new Date();
        res.send('Fecha de ultima session actualizada.')
    }else{
        res.send('No hay una sesión activa.')
    }   
})
// Ruta para verificar la antiguedad de la sesion 
app.get('/estado-session',(req,res)=> {
        if (req.session.inicio){
            const inicio = new Date(req.session.inicio);
            const ultimoAccesso = new Date(req.session.ultimoAcceso);
            const ahora= new Date();

            //calcular la antiguedad de la session 
            const antiguedadMS = ahora-inicio
            const horas = Math.floor(antiguedadMS / (1000*60*60))
            const minutos = Math.floor((antiguedadMS % (1000*60*60)) / (1000*60))
            const segundos = Math.floor((antiguedadMS % (1000*60)) /1000)
            

            res.json ({
                mensaje:'Estado de la sesión ',
                sessionID: req.sessionID,
                inicio: inicio.toISOString(),
                ultimoAcceso: ultimoAccesso.toISOString(),
                antiguedad: `${horas} horas,${minutos} minutos,${segundos} segundos`

            })
        }else{
            res.send('No hay una sesión activa')
        }
    })


// Ruta para cerrar sesion 
app.get('/cerrar-session',(req,res) => {
    if(req.session){
        req.session.destroy((err) => {
            if(err) {
                return res.status(500).send('Error al cerrar la sesion')
            }
            res.send('Sesion cerrada correctamente.')
        })
    }else{
        res.send('No hay una sesion activa para cerrar.')
    }
})
          
// Iniciar el servidor
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`)
})

    
