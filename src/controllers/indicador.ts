import db from '../database/connection';
import {Request, Response} from 'express';
import { resultado } from './resultado';

export interface indicador {
    nome: string,
	tipo?: string,
	demonstra: string,
	como_calcular: string,
	como_analisar: string,
	termo_lexico?: string,
	nocao_lexico?: string,
	impacto_lexico?: string,
	sinonimo_lexico?: string,
	fonte_lexico?: string,
	tipo_lexico?: string,
	formato_lexico?: string,
	restricao_lexico?: string,
	id_objetivo: number,
}
export default class IndicadorController {
    async create(req: Request, res: Response) {
        const indicador: indicador = req.body;
        try { 
            const indicadorCriado: number = await db('Indicador').insert(indicador);
            return res.status(200).json(indicadorCriado);

        } catch(e: any) {
            return res.status(500).json({err: e});
        }
    }
    async read(req: Request, res: Response) {
        try {
            const indicador: Array<indicador> = await db('Indicador').select();
            return res.status(200).json(indicador);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }
    async readById(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const indicador: Array<indicador> = await db('Indicador').select().where('id', id);
            return res.status(200).json(indicador);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }
    async update(req: Request, res: Response) {
        const {id} = req.params;
        const update: indicador = req.body;

        try {
            const indicadorExiste: Array<indicador> = await db('Indicador').select().where('id', id);
            if(indicadorExiste){
                const indicadorAtualizado: number = await db('Indicador').update(update).where('id', id);
                return res.status(200).json(indicadorAtualizado);
            }
            return res.status(404).json({err: 'indicador não encontrado'});
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }
    async delete(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const indicador: number = await db('Indicador').delete().where('id', id);
            return res.status(200).json(indicador);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }

    async getResultado(req: Request, res: Response){
        const {id} = req.params;

        try {
            const resultado: Array<resultado> = await db.select(
                ['resultado.id as id_resultado',
                    'resultado.nome as nome_resultado',
                ]).table('resultado').where('id_indicador', id);
            return res.status(200).json(resultado);
        } catch(e: any) {
            return res.status(500).json({err: e});
        }
    }
}
