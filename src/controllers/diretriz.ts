import db from '../database/connection';
import {Request, Response} from 'express';
import { objetivo } from './objetivo';

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
            const diretrizCriada: number = await db('diretriz').insert(diretriz); 
            return res.status(200).json(diretrizCriada);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }

    async read(req: Request, res: Response) {

        try {
            const diretriz: Array<diretriz> = await db('diretriz').select();
            return res.status(200).json(diretriz);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }

    async readById(req: Request, res: Response) {

        const {id} = req.params;
        try {
            const diretriz: Array<diretriz> = await db('diretriz').select().where('id', id);
            return res.status(200).json(diretriz);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }

    async update(req: Request, res: Response) {

        const {id} = req.params;
        const update: diretriz = req.body;

        try {
            const diretrizExiste: Array<diretriz> = await db('diretriz').select().where('id', id);
            if(diretrizExiste){
                const diretrizAtualizada: number = await db('diretriz').update(update).where('id', id);
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
            const diretriz: number = await db('diretriz').delete().where('id', id);
            return res.status(200).json(diretriz);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }

    async getObjetivo(req: Request, res: Response){
        const {id} = req.params;

        try {
            const objetivo: Array<objetivo> = await db.select(
                ['objetivo.id as id_objetivo',
                    'objetivo.nome as nome_objetivo',
                ]).table('objetivo').where('id_diretriz', id);
            return res.status(200).json(objetivo);
        } catch(e: any) {
            return res.status(500).json({err: e});
        }
    }
}