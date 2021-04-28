import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import Asistente from '../models/asistentes';
import Actividad from '../models/actividades';
import { Sequelize as sequelize, Op } from 'sequelize';
import { now } from 'sequelize/types/lib/utils';

/**
 * @api {get} /api/usuarios Muestra todos los usuarios o el numero que se desee de usuarios
 * @apiName GetUsuarios
 * @apiGroup Users
 *
 * @apiParam {Number} limit Limite de usuarios.
 * @apiParam {Number} skip Offset de usuarios.
 *
 * @apiSuccess {Number} id Te devuelve el ID del usuario.
 * @apiSuccess {Number} id_actividad Te devuelve el ID de la actividad del usuario.
 * @apiSuccess {String} nombre Te devuelve el nombre del usuario.
 * @apiSuccess {String} apellido Te devuelve el apellido del usuario.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     { "asistentes" : [
 *              {
 *                  "id": 13,
 *                  "id_actividad": 1,
 *                  "nombre": "Pantaleon",
 *                  "apellido": "Ferrer"
 *               }
 *           ]
 *     }
 * @apiError {Boolean} ok Identifica si la operación ha sido incorrecta o no
 * @apiError {String} msg Te devuelve un mensaje para el error
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 Internal Server Error
 *      {
 *          ok: false,
 *          msg: "No existe la tabla o los campos son incorrectos"
 *      }
 */

export const getUsuarios = async( req: Request , res: Response ) => {
    
    try{
        const {body} = req
        let params = {};
        if(body.limit)
            params.limit = body.limit
            
        
        if(body.skip)
         params.offset = body.skip   
        

        const asistentes = await Asistente.findAll(params)
        
        res.json({ asistentes });
    }catch{
        res.status(500).json({
            ok: false,
            msg: "No existe la tabla o los campos son incorrectos"
        })
    }

    
}
/**
 * @api {get} /api/usuarios/:id Muestra el usuario con el :id
 * @apiName GetUsuario
 * @apiGroup Users
 *
 * @apiParam {Number} id ID del usuario.
 *
 * @apiSuccess {Number} id Te devuelve el ID del usuario.
 * @apiSuccess {Number} id_actividad Te devuelve el ID de la actividad del usuario.
 * @apiSuccess {String} nombre Te devuelve el nombre del usuario.
 * @apiSuccess {String} apellido Te devuelve el apellido del usuario.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     
 *              {
 *                  "id": 13,
 *                  "id_actividad": 1,
 *                  "nombre": "Pantaleon",
 *                  "apellido": "Ferrer"
 *               }
 *           
 *     
 * @apiError {Boolean} ok Identifica si la operación ha sido incorrecta o no
 * @apiError {String} msg Te devuelve un mensaje para el error
 * @apiErrorExample {json} Error-Response:
 *  @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 404 Not Found
 *      {
 *          ok: false,
 *          msg: "No existe un usuario con el id :id"
 *      }
 * 
 *  HTTP/1.1 500 Internal Server Error
 *      {
 *          ok: false,
 *          msg: "No existe la tabla o los campos son incorrectos"
 *      }
 */

export const getUsuario = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const asistente = await Asistente.findByPk( id );

    if( asistente ) {
        res.json(asistente);
    } else {
        res.status(404).json({
            ok: false,
            msg: `No existe un usuario con el id ${ id }`
        });
    }


}

/**
 * @api {post} /api/usuarios Añade un usuario y lo mete en una actividad
 * @apiName postUsuarios
 * @apiGroup Users
 *
 * @apiParam {String} nombre Nombre del usuario
 * @apiParam {String} apellido Apelldio del usuario
 * @apiParam {String} herramientas Herramientas del usuario con formato "[\"Herramienta\"]"
 *
 * @apiSuccess {Number} id Te devuelve el ID del usuario.
 * @apiSuccess {Number} id_actividad Te devuelve el ID de la actividad del usuario.
 * @apiSuccess {String} nombre Te devuelve el nombre del usuario.
 * @apiSuccess {String} apellido Te devuelve el apellido del usuario.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     
 *              {
 *                  "id": 13,
 *                  "id_actividad": 1,
 *                  "nombre": "Pantaleon",
 *                  "apellido": "Ferrer"
 *               }
 *           
 *     
 * @apiError {Boolean} ok Identifica si la operación ha sido incorrecta o no
 * @apiError {String} msg Te devuelve un mensaje para el error
 * @apiErrorExample {json} Error-Response:
 *  @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 403 Forbidden
 *      {
 *          ok: false,
 *          msg: "No se puede añadir al usuario en esta actividad"
 *      }
 * 
 *  HTTP/1.1 500 Internal Server Error
 *      {
 *          ok: false,
 *          msg: "Hable con el administrador"
 *      }
 */

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


