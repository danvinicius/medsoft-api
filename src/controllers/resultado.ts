import db from '../database/connection';
import {Request, Response} from 'express';

export interface resultado {
    nome: string,
    descricao: string,
    valor: string,
    id_indicador: number,
}

export default class ResultadoController {
    async create(req: Request, res: Response) {
        const resultado: resultado = req.body;
        try { 
            const resultadoCriado: number = await db('resultado').insert(resultado);
            return res.status(200).json(resultadoCriado);

        } catch(e: any) {
            return res.status(500).json({err: e});
        }
    }
    async read(req: Request, res: Response) {
        try {
            const resultado: Array<resultado> = await db('resultado').select();
            return res.status(200).json(resultado);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }
    async readById(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const resultado: Array<resultado> = await db('resultado').select().where('id', id);
            return res.status(200).json(resultado);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }
    async update(req: Request, res: Response) {
        const {id} = req.params;
        const update: resultado = req.body;

        try {
            const resultadoExiste: Array<resultado> = await db('resultado').select().where('id', id);
            if(resultadoExiste){
                const resultadoAtualizado: number = await db('resultado').update(update).where('id', id);
                return res.status(200).json(resultadoAtualizado);
            }
            return res.status(404).json({err: 'resultado não encontrado'});
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }
    async delete(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const resultado: number = await db('resultado').delete().where('id', id);
            return res.status(200).json(resultado);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }
}
