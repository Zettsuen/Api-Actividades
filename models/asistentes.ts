import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Asistente = db.define('Asistente', {
    id_actividad: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    }
}, {timestamps: false,});


export default Asistente;