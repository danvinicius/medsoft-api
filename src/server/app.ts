import express, {Express} from 'express';
import cors from 'cors';
import projetoRouter from '../routes/projeto';

class Server {
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
    }

    run() {
        this.app.listen(this.port, ()=> {
            console.log('Server running on port ' + this.port);
        });
    }

}

const app = express();
const PORT = 8081;
const server = new Server(PORT, app);

//=-=-=-=-=-=-=-=-//
server.config();
server.run();



