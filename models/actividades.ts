import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Actividad = db.define('Actividade', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    fecha_incio: {
        type: DataTypes.DATE
    },
    fecha_final: {
        type: DataTypes.DATE
    },
    fecha_inicio_inscripcion: {
        type: DataTypes.DATE
    },
    fecha_final_inscripcion: {
        type: DataTypes.DATE
    },
    maxima_capacidad: {
        type: DataTypes.INTEGER
    },
    cancelado: {
        type: DataTypes.BOOLEAN
    },
    organizador: {
        type: DataTypes.STRING
    },
    fecha_creacion: {
        type: DataTypes.DATE
    },
    herramientas: {
        type: DataTypes.STRING
    }

}, {timestamps: false});


export default Actividad;