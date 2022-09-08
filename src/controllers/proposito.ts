import db from '../database/connection';
import {Request, Response} from 'express';
import {diretriz} from './diretriz';

export interface proposito {
    nome: string,
    descricao?: string,
    id_projeto: number,
}

export default class PropositoController {
    async create(req: Request, res: Response) {
        const proposito: proposito = req.body;
        try { 
            const propositoCriado: number = await db('proposito').insert(proposito);
            return res.status(200).json(propositoCriado);

        } catch(e: any) {
            return res.status(500).json({err: e});
        }
    }
    async read(req: Request, res: Response) {
        try {
            const proposito: Array<proposito> = await db('proposito').select();
            return res.status(200).json(proposito);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }
    async readById(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const proposito: Array<proposito> = await db('proposito').select().where('id', id);
            return res.status(200).json(proposito);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }
    async update(req: Request, res: Response) {
        const {id} = req.params;
        const update: proposito = req.body;

        try {
            const propositoExiste: Array<proposito> = await db('proposito').select().where('id', id);
            if(propositoExiste){
                const propositoAtualizado: number = await db('proposito').update(update).where('id', id);
                return res.status(200).json(propositoAtualizado);
            }
            return res.status(404).json({err: 'proposito não encontrado'});
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }
    async delete(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const proposito: number = await db('proposito').delete().where('id', id);
            return res.status(200).json(proposito);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }

    async getDiretriz(req: Request, res: Response){
        const {id} = req.params;

        try {
            const diretriz: Array<diretriz> = await db.select(
                ['diretriz.id as id_diretriz',
                    'diretriz.codigo as codigo_diretriz',
                    'diretriz.nome as nome_diretriz',
                ]).table('diretriz').where('id_proposito', id);
            return res.status(200).json(diretriz);
        } catch(e: any) {
            return res.status(500).json({err: e});
        }
    }
}
