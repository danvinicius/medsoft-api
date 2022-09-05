/*To chamando a conexão com o banco, ele que vai me prover
os métodos necessários pra fazer o crud
*/
import db from '../database/connection';
import {Request, Response} from 'express';
import {proposito} from './proposito';

interface projeto {
    nome: string,
    descricao: string,
}

//Criando uma classe pro meu controller e exportando ele pra ser usado na rota
export default class ProjetoController {

    //Método de criar projeto
    async create(req: Request, res: Response) {

        //Aqui eu pego os dados que o usuário enviou pelo formulário, eles precisam implementar a interface projeto
        const projeto: projeto = req.body;

        try {
            //Tento criar o projeto no banco com as informações desse objeto que eu criei
            const projetoCriado: number = await db('projeto').insert(projeto);

            //Se der certo ele retorna 1
            return res.status(200).json(projetoCriado);

        } catch(e) {

            //Se der errado ele printa o erro e retorna null
            return res.status(500).json({err: e});
        }
    }

    //Método de recuperar todos os projetos
    async read(req: Request, res: Response) {
        try {
            //Tento recuperar os projetos
            const projeto: Array<projeto> = await db('projeto').select();

            //Se der certo, retorna os projetos
            return res.status(200).json(projeto);
        } catch(e) {

            //Se der errado ele printa o erro e retorna null
            return res.status(500).json({err: e});
        }
    }

    //Método de recuperar um projeto específico
    async readById(req: Request, res: Response) {

        //Leio o id que o usuário passou como parâmetro do endpoint/rota/url
        const {id} = req.params;
        try {

            //Tento recuperar os projetos
            const projeto: Array<projeto> = await db('projeto').select().where('id', id);

            //Se der certo, retorna os projetos
            return res.status(200).json(projeto);
        } catch(e) {

            //Se der errado ele printa o erro e retorna null
            return res.status(500).json({err: e});
        }
    }

    //Método de pegar o(s) propósito(s) relacionados ao projeto
    async getProposito(req: Request, res: Response){
        const {id} = req.params;

        try {
            //Busco o id, nome  descrição do proposito cujo campo id_projeto é igual ao id do projeto enviado como parametro na url
            //Ainda estou vendo se é a forma mais fácil de fazer isso
            //Mas o padrão é esse, vamos no controller do pai e buscamos o filho relacionado
            const proposito: Array<proposito> = await db.select(
                ['proposito.id as id_proposito',
                    'proposito.nome as nome_proposito',
                    'proposito.descricao as descricao_proposito'
                ]).table('proposito').where('id_projeto', id);
            return res.status(200).json(proposito);
        } catch(e: any) {
            return res.status(500).json({err: e});
        }
    }

    //Método pra atualizar um projeto
    async update(req: Request, res: Response) {

        //Pego o id passado por parâmetro
        const {id} = req.params;

        //Pego as novas informações passados pelo formulário, elas precisam implementar a interface projeto
        const update: projeto = req.body;

        try {

            //Antes de atualizar, preciso saber se esse projeto existe
            const projetoExiste: Array<projeto> = await db('projeto').select().where('id', id);
            if(projetoExiste){

                //Tento atualizar esse projeto no banco com as novas informações que estão nesse objeto
                const projetoAtualizado: number = await db('projeto').update(update).where('id', id);

                //Se atualizar, retorna 1
                return res.status(200).json(projetoAtualizado);
            }

            //Se não existir o projeto, lança um 404
            return res.status(404).json({err: 'Projeto não encontrado'});
        } catch(e) {

            //Se der algum outro erro, printa e retorna null
            return res.status(500).json({err: e});
        }
    }

    //Método de deletar projeto, preguiça de comentar, é bem intuitivo
    async delete(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const projeto: number = await db('projeto').delete().where('id', id);
            return res.status(200).json(projeto);
        } catch(e) {
            return res.status(500).json({err: e});
        }
    }
}
