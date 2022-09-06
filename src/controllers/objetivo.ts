import db from '../database/connection';
import {Request, Response} from 'express';

export interface objetivo {
    nome: string,
    descricao: string,
    id_diretriz: number,
}

export default class ObjetivoController {

    async create(req: Request, res: Response) {

        const objetivo: objetivo = req.body;
        try {
            const objetivoCriada: number = await db('Objetivo').insert(objetivo); 
            // db('Objetivo') tá com letra maiúscula porque é assim que tá no sql.
    
            return res.status(200).json(objetivoCriada);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }

    async read(req: Request, res: Response) {

        try {
            const objetivo: Array<objetivo> = await db('Objetivo').select();
            return res.status(200).json(objetivo);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }

    async readById(req: Request, res: Response) {

        const {id} = req.params;
        try {
            const objetivo: Array<objetivo> = await db('Objetivo').select().where('id', id);
            return res.status(200).json(objetivo);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }

    async update(req: Request, res: Response) {

        const {id} = req.params;
        const update: objetivo = req.body;

        try {
            const objetivoExiste: Array<objetivo> = await db('Objetivo').select().where('id', id);
            if(objetivoExiste){
                const objetivoAtualizada: number = await db('Objetivo').update(update).where('id', id);
                return res.status(200).json(objetivoAtualizada);
            }
            return res.status(404).json({err: 'objetivo não encontrado'});
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }

    async delete(req: Request, res: Response) {

        const {id} = req.params;
        try {
            const objetivo: number = await db('Objetivo').delete().where('id', id);
            return res.status(200).json(objetivo);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }
}