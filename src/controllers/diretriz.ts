import db from '../database/connection';
import {Request, Response} from 'express';

export interface diretriz {
    codigo: string,
    nome: string,
    descricao: string,
    id_proposito: number,
}

export default class DiretrizController {

    async create(req: Request, res: Response) {

        const diretriz: diretriz = req.body;
        try {
            const diretrizCriada: number = await db('Diretriz').insert(diretriz); 
            // db('Diretriz') tá com letra maiúscula porque é assim que tá no sql.
    
            return res.status(200).json(diretrizCriada);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }

    async read(req: Request, res: Response) {

        try {
            const diretriz: Array<diretriz> = await db('Diretriz').select();
            return res.status(200).json(diretriz);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }

    async readById(req: Request, res: Response) {

        const {id} = req.params;
        try {
            const diretriz: Array<diretriz> = await db('Diretriz').select().where('id', id);
            return res.status(200).json(diretriz);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }

    async update(req: Request, res: Response) {

        const {id} = req.params;
        const update: diretriz = req.body;

        try {
            const diretrizExiste: Array<diretriz> = await db('Diretriz').select().where('id', id);
            if(diretrizExiste){
                const diretrizAtualizada: number = await db('Diretriz').update(update).where('id', id);
                return res.status(200).json(diretrizAtualizada);
            }
            return res.status(404).json({err: 'diretriz não encontrada'});
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }

    async delete(req: Request, res: Response) {

        const {id} = req.params;
        try {
            const diretriz: number = await db('Diretriz').delete().where('id', id);
            return res.status(200).json(diretriz);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }
}