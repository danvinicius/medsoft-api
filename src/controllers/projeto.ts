import db from '../database/connection';
import {Request, Response} from 'express';
import {proposito} from './proposito';

interface projeto {
    nome: string,
    descricao: string,
}
export default class ProjetoController {
    async create(req: Request, res: Response) {
        const projeto: projeto = req.body;

        try {
            const projetoCriado: number = await db('Projeto').insert(projeto);
            return res.status(200).json(projetoCriado);

        } catch(e) {
            return res.status(500).json({err: e});
        }
    }
    async read(req: Request, res: Response) {
        try {            const projetos: Array<projeto> = await db('Projeto').select();
            return res.status(200).json(projetos);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }

    async readById(req: Request, res: Response) {

        const {id} = req.params;
        try {
            const projeto: Array<projeto> = await db('Projeto').select().where('id', id);

            return res.status(200).json(projeto);
        } catch(e) {

            return res.status(500).json({err: e});
        }
    }

    async update(req: Request, res: Response) {
        const {id} = req.params;
        const update: projeto = req.body;
        try {
            const projetoExiste: Array<projeto> = await db('Projeto').select().where('id', id);
            if(projetoExiste){

                const projetoAtualizado: number = await db('Projeto').update(update).where('id', id);

                return res.status(200).json(projetoAtualizado);
            }

            return res.status(404).json({err: 'Projeto não encontrado'});
        } catch(e) {

            return res.status(500).json({err: e});
        }
    }

    async delete(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const projeto: number = await db('Projeto').delete().where('id', id);
            return res.status(200).json(projeto);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }

    async getProposito(req: Request, res: Response){
        const {id} = req.params;

        try {
            const proposito: Array<proposito> = await db.select(
                ['proposito.id as id_proposito',
                    'proposito.nome as nome_proposito',
                ]).table('proposito').where('id_projeto', id);
            return res.status(200).json(proposito);
        } catch(e: any) {
            return res.status(500).json({err: e});
        }
    }
}
