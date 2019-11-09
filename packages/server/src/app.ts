import express from "express";

import bodyParser from "body-parser";
// import errorMiddleware from './middleware/error.middleware';


import path from "path";
import mongoose from "mongoose";

import bluebird from "bluebird";

import { MONGODB_URI } from "./util/secrets";
import Controller from "./api/controller.interface";


export class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();



        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();

        this.app.use(
            express.static(path.join(__dirname, "../../front/dist"), { maxAge: 31557600000 })
        );
    }

    public listen() {
        this.app.listen(process.env.PORT || 3000, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());

    }

    private initializeErrorHandling() {
        // this.app.use(errorMiddleware);
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private connectToTheDatabase() {
        // const {
        //     MONGO_USER,
        //     MONGO_PASSWORD,
        //     MONGO_PATH,
        // } = process.env;
        // mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
        const mongoUrl = MONGODB_URI
        mongoose.Promise = bluebird;

        mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
            () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
        ).catch(err => {
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
            // process.exit();
        });
    }
}





