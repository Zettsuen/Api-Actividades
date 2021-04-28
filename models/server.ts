import express, { Application } from 'express';
import userRoutes from '../routes/asistentes';
import ActivityRoutes from '../routes/actividades';
import cors from 'cors';

import db from '../db/connection';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        actividades: '/api/actividades'
    }

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8000';

        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {

        try {
            
            await db.authenticate();
            console.log('Database online');

        } catch (error) {
            throw new Error( error );
        }

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        // Carpeta pública
        this.app.use( express.static('public') );
    }


    routes() {
        this.app.use( this.apiPaths.usuarios, userRoutes )
        this.app.use( this.apiPaths.actividades, ActivityRoutes )
    }


    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }

}

export default Server;