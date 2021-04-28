import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import Actividad from '../models/actividades';

export const getActividades = async( req: Request , res: Response ) => {

    try{
        const actividades = await Actividad.findAll();
        
        res.json({ actividades });
    }catch(Error){
        res.status(500).json({
            ok: false,
            msg: "No existe la tabla o los campos son incorrectos"
        })
        console.log(Error);
    }

    
}

export const getActividad = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const actividades = await Actividad.findByPk( id );

    if( actividades ) {
        res.json(actividades);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${ id }`
        });
    }


}