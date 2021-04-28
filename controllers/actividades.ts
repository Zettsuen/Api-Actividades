import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import Actividad from '../models/actividades';

/**
 * @api {get} /api/actividades Muestra todas las actividades o el numero que se desee de actividades
 * @apiName GetActividades
 * @apiGroup Actividades
 *
 * @apiParam {Number} limit Limite de actividades.
 * @apiParam {Number} skip Offset de actividades.
 *
 * @apiSuccess {Number} id Te devuelve el ID de la actividad.
 * @apiSuccess {String} nombre Te devuelve el nombre de la actividad.
 * @apiSuccess {DATE} fecha_inicio Te devuelve la fecha de inicio de la actividad.
 * @apiSuccess {DATE} fecha_final Te devuelve la fecha de final de la actividad.
 * @apiSuccess {DATE} fecha_inicio_inscripcion Te devuelve la fecha de inicio de la inscripción de la actividad.
 * @apiSuccess {DATE} fecha_final_inscripcion Te devuelve la fecha de finalización de la inscripción de la actividad.
 * @apiSuccess {Number} maxima_capacidad Te devuelve la capacidad maxima de usuarios de la actividad.
 * @apiSuccess {Boolean} cancelado Te devuelve false si la actividad no esta cancelada.
 * @apiSuccess {String} organizador Te devuelve el nombre del organizador de la actividad.
 * @apiSuccess {DATE} fecha_creacion Te devuelve la fecha de creación de la actividad.
 * @apiSuccess {String} herramientas Te devuelve las herramientas necesarias para participar
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     { "actividades": [
        {
            "id": 1,
            "nombre": "Aumenta tu expresividad",
            "fecha_incio": "2021-04-30T15:00:00.000Z",
            "fecha_final": "2021-04-30T17:00:00.000Z",
            "fecha_inicio_inscripcion": null,
            "fecha_final_inscripcion": null,
            "maxima_capacidad": 30,
            "cancelado": false,
            "organizador": "Rising Recursos Humanos",
            "fecha_creacion": "2021-04-27T20:26:49.000Z",
            "herramientas": "[\"aa\",\"bb\"]"
        } ]
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

export const getActividades = async( req: Request , res: Response ) => {

    try{
        const {body} = req
        let params = {};
        if(body.limit)
            params.limit = body.limit
            
        
        if(body.skip)
         params.offset = body.skip

        const actividades = await Actividad.findAll(params);
        
        res.json({ actividades });
    }catch(Error){
        res.status(500).json({
            ok: false,
            msg: "No existe la tabla o los campos son incorrectos"
        })
        console.log(Error);
    }

    
}

/**
 * @api {get} /api/actividades/:id Muestra la actividad con el :id
 * @apiName GetActividad
 * @apiGroup Actividades
 *
 * @apiParam {Number} id ID de la actividad.
 *
 * @apiSuccess {Number} id Te devuelve el ID de la actividad.
 * @apiSuccess {String} nombre Te devuelve el nombre de la actividad.
 * @apiSuccess {DATE} fecha_inicio Te devuelve la fecha de inicio de la actividad.
 * @apiSuccess {DATE} fecha_final Te devuelve la fecha de final de la actividad.
 * @apiSuccess {DATE} fecha_inicio_inscripcion Te devuelve la fecha de inicio de la inscripción de la actividad.
 * @apiSuccess {DATE} fecha_final_inscripcion Te devuelve la fecha de finalización de la inscripción de la actividad.
 * @apiSuccess {Number} maxima_capacidad Te devuelve la capacidad maxima de usuarios de la actividad.
 * @apiSuccess {Boolean} cancelado Te devuelve false si la actividad no esta cancelada.
 * @apiSuccess {String} organizador Te devuelve el nombre del organizador de la actividad.
 * @apiSuccess {DATE} fecha_creacion Te devuelve la fecha de creación de la actividad.
 * @apiSuccess {String} herramientas Te devuelve las herramientas necesarias para participar
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "id": 1,
 *           "nombre": "Aumenta tu expresividad",
 *           "fecha_incio": "2021-04-30T15:00:00.000Z",
 *           "fecha_final": "2021-04-30T17:00:00.000Z",
 *           "fecha_inicio_inscripcion": null,
 *           "fecha_final_inscripcion": null,
 *           "maxima_capacidad": 30,
 *           "cancelado": false,
 *           "organizador": "Rising Recursos Humanos",
 *           "fecha_creacion": "2021-04-27T20:26:49.000Z",
 *           "herramientas": "[\"aa\",\"bb\"]"
 *       } 
 *
 * @apiError {Boolean} ok Identifica si la operación ha sido incorrecta o no
 * @apiError {String} msg Te devuelve un mensaje para el error
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 Internal Server Error
 *      {
 *          ok: false,
 *          msg: "No existe la tabla o los campos son incorrectos"
 *      }
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 404 Not Found
 *      {
 *          ok: false,
 *          msg: "No existe la actividad con el id :id"
 *      }
 */

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