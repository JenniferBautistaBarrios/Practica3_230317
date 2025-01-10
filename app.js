import express from "express"
import session, { Cookie } from "express-session"

const app=express()

//?configuracion del middleware de secciones 
app.use(session({
    secret: 'uXpmk3su09HjK01',
    resave:'false',
    saveUninitialized:true,
    Cookie: {maxAge: 24*60*60*1000}//1 dia   
    
}))
//?Ruta para inicializar secion 
app.get('/iniciar-sesion',(req ,res) => {
    if(!req.session.inicio){
        req.session.inicio =new Date()// Fecha de inicio de la sesion 
         req.session.ultimoAcceso =new Date()//ULTIMO CONSULTA INICIAL 
         req.sessionID('Sesion iniciada.')
    }else{
        res.send('La sesion ya esta activa.')
    }
})
//? Ruta para actualizar la fecha de la ukltima consulta 
app.get ('/actualizar',(req,res)=>{
    if(req.session.inicio){
        req.session.ultimoAcceso =new Date()
        res.send('Fecha de ultima session actualizada.')
    }else{
        res.send('No hay una seccion activa .')
    }   
    })
    //?Ruta para cverificar la antiguedad de la sesion 
    app.get('/estado-session ',(req,res)=> {
        if (req.session.inicio){
            const inicio =req.session.inicio
            const ultimoAccesso =req.session.ultimoAcceso
            const ahora =new Date()
            //calcular la antiguedad de la session 
            const antiguedadMs =ahora=inicio
            const horas =Math.floor(antiguedadMS / (1000*60*60))
            const minutos =Math.floor((antiguedadMS % (1000*60*60)) / (1000*60))
            const segundos  =Math.floor((antiguedadMS % (1000*60)) /1000)
            

            res.json ({
                mensaje:'estado de la seccion ',
                sessionID:req.sessionID,
                inicio:inicio.TOISOString(),
                ultimoAcceso:ultimoAccesso.toISOString(),
                antiguedad :'${horas}horas,${minutos}minutos,${segundos}segundos'

            })
        }else{
            res.send('No hay una sesion activa')
        }
    })
    //?Ruta para cerrar sesion 
    app.get('/cerrar-session ',(req,res)) =>{
        if(req.session){
            req.session.
        }
    }
          
    

    
