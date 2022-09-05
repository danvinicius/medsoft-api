import express, {Express} from 'express';
import cors from 'cors';
import projetoRouter from '../routes/projeto';
import propositoRouter from '../routes/proposito';

export default class Server {
    port: number;
    app: Express;

    constructor(port: number, app: Express) {
        this.port = port;
        this.app = app;
    }

    config() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use('/projeto', projetoRouter);
        this.app.use('/proposito', propositoRouter);
    }

    run() {
        this.app.listen(this.port, ()=> {
            console.log('Server running on port ' + this.port);
        });
    }

}