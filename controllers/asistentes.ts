import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import Asistente from '../models/asistentes';
import Actividad from '../models/actividades';
import { Sequelize as sequelize, Op } from 'sequelize';
import { now } from 'sequelize/types/lib/utils';

export const getUsuarios = async( req: Request , res: Response ) => {
    try{
        const asistentes = await Asistente.findAll();
        
        res.json({ asistentes });
    }catch{
        res.status(500).json({
            ok: false,
            msg: "No existe la tabla o los campos son incorrectos"
        })
    }

    
}

export const getUsuario = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const asistente = await Asistente.findByPk( id );

    if( asistente ) {
        res.json(asistente);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${ id }`
        });
    }


}

export const postUsuario = async( req: Request , res: Response ) => {

    const { body } = req;
    console.log(body);
    try {
       
        const act = await Actividad.findAll({
            attributes: ['id'],
            where:{
                
                [Op.and]: [{
                    fecha_final: {
                        [Op.gte]: new Date()
                    },
                    [Op.or]: [{
                        fecha_inicio_inscripcion:{
                            [Op.lte]: new Date()
                        },
                        
                    },{
                        fecha_inicio_inscripcion: null
                    }]  
                },{
                    [Op.or]: [{
                        fecha_final_inscripcion:{
                            [Op.gte]: new Date()
                        },
                        
                    },{
                        fecha_final_inscripcion: null
                    }]  
                },{
                    cancelado: 0
                },{
                    herramientas: {
                        [Op.in]: ["[]", req.body.herramientas]
                    }
                }, {
                    id: req.body.id_actividad
                },{
                    [Op.or]: [{
                        maxima_capacidad: null
                    }, {
                        maxima_capacidad: {
                            [Op.gt]: sequelize.literal('(SELECT COUNT(1) FROM asistentes WHERE id_actividad = ' + body.id_actividad + ')')
                        }
                    }]
                }],
    
            }
            
        });
        if(act.length !== 1){
            return res.status(403).json({
                ok: false,
                msg: "No se puede añadir al usuario en esta actividad"
            })
        }

        const asistente = new Asistente(body);
        await asistente.save();

        res.json( asistente );


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }



}


