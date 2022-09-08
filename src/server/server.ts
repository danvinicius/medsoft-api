import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import projetoRouter from '../routes/projeto';
import propositoRouter from '../routes/proposito';
import diretrizRouter from '../routes/diretriz';
import objetivoRouter from '../routes/objetivo';
import indicadorRouter from '../routes/indicador';
import resultadoRouter from '../routes/resultado';

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

        //routes
        this.app.use('/projeto', projetoRouter);
        this.app.use('/proposito', propositoRouter);
        this.app.use('/diretriz', diretrizRouter);
        this.app.use('/objetivo', objetivoRouter);
        this.app.use('/indicador', indicadorRouter);
        this.app.use('/resultado', resultadoRouter);
        this.app.use('/*', (req: Request, res: Response) => {
            res.status(404).json({err: 'Not found'});
        });
    }

    run() {
        this.app.listen(this.port, ()=> {
            console.log('Server running on port ' + this.port);
        });
    }

}